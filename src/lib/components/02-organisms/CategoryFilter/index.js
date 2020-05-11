import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef
} from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../CategorizedListRoot";
import Autocomplete from "../Autocomplete";
import {
  assoc,
  equals,
  filter,
  find,
  includes,
  map,
  propEq,
  dissoc,
  concat,
  flatten,
  values,
  uniq,
  last,
  differenceWith
} from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import { getAnchorPart } from "../../../utils/common";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";
import kuntaMaakuntaMapping from "./storydata/kuntaMaakuntaMapping";

const mapping = {
  "01": "FI-18",
  "02": "FI-19",
  "04": "FI-17",
  "05": "FI-06",
  "06": "FI-11",
  "07": "FI-16",
  "08": "FI-09",
  "09": "FI-02",
  "10": "FI-04",
  "11": "FI-15",
  "12": "FI-13",
  "14": "FI-03",
  "16": "FI-07",
  "13": "FI-08",
  "15": "FI-12",
  "17": "FI-14",
  "18": "FI-05",
  "19": "FI-10",
  "21": "FI-01"
};

const CategoryFilter = React.memo(
  ({
    anchor = "no-anchor-defined",
    categories = [],
    changeObjects,
    onChanges
  }) => {
    const [maakuntaId, setMaakuntaId] = useState("");

    const [cos, setCos] = useState([]);

    const labelSeries = useRef(null);
    const polygonSeries = useRef(null);
    const kartta = useRef(null);
    const activePolygon = useRef(null);
    const previousSelection = useRef([]);

    const maakuntaCategories = useMemo(() => {
      const result = find(propEq("formId", maakuntaId), categories);
      return [result].filter(Boolean);
    }, [categories, maakuntaId]);

    const ids = useMemo(() => {
      return map(category => {
        return {
          id: category.formId,
          title: category.components[0].properties.title
        };
      }, categories);
    }, [categories]);

    // const reducedStructure = useMemo(() => getReducedStructure(categories), [
    //   categories
    // ]);

    const [filteredChangeObjects, setFilteredChangeObjects] = useState(
      changeObjects
    );

    useEffect(() => {
      kartta.current = am4core.create("finland_map", am4maps.MapChart);
      kartta.current.geodata = am4geodata_finland;
      // Set projection
      kartta.current.projection = new am4maps.projections.Miller();

      kartta.current.geodataNames = am4geodata_lang_FI;
      // kartta.current.responsive.enabled = true;
      kartta.current.interactions.keydown = e => {
        console.info(e);
      };

      // Create map polygon series
      polygonSeries.current = kartta.current.series.push(
        new am4maps.MapPolygonSeries()
      );

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.current.useGeodata = true;

      // Add heat rule
      polygonSeries.current.heatRules.push({
        property: "fill",
        target: polygonSeries.current.mapPolygons.template,
        min: am4core.color("#E7E7B9"),
        max: am4core.color("#109F52")
        // logarithmic: true
      });

      // Add expectancy data
      polygonSeries.current.events.on("beforedatavalidated", function(ev) {
        var source = ev.target.data;
        if (source.maybe) {
          ev.target.data = source.maybe.here.values;
        }
      });

      // Configure series
      var polygonTemplate = polygonSeries.current.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#dadada");
      // polygonTemplate.stroke = am4core.color("#dddddd");

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#dbe1db");

      // Create active state
      const activeState = polygonTemplate.states.create("active");
      activeState.properties.stroke = am4core.color("#367B25");

      polygonTemplate.events.on("hit", function(e) {
        activePolygon.current = e.target;
        setMaakuntaId(e.target.dataItem.dataContext.id);
      });

      // Configure label series
      labelSeries.current = kartta.current.series.push(
        new am4maps.MapImageSeries()
      );
      var labelTemplate = labelSeries.current.mapImages.template.createChild(
        am4core.Label
      );
      labelTemplate.horizontalCenter = "middle";
      labelTemplate.verticalCenter = "middle";
      labelTemplate.fontSize = 16;
      labelTemplate.interactionsEnabled = false;
      labelTemplate.nonScaling = true;

      return function cancel() {
        kartta.current.dispose();
      };
    }, [ids]);

    const kuntiaPerMaakunta = map(category => {
      return {
        id: category.anchor,
        amount: category.categories[0].components.length
      };
    }, categories);

    useEffect(() => {
      // console.info(cos[maakuntaId], kuntiaPerMaakunta);
      let polygonSerie = find(
        propEq("id", maakuntaId),
        polygonSeries.current.data
      );
      const valittujaKuntia = Math.max(
        filter(changeObj => {
          return changeObj.properties.isChecked;
        }, cos[maakuntaId] || []).length - 1, // Maakunta excluded
        0
      );

      const kuntiaYhteensa = (
        find(propEq("id", maakuntaId), kuntiaPerMaakunta) || {}
      ).amount;

      if (kuntiaYhteensa) {
        if (valittujaKuntia > 0) {
          polygonSerie = assoc(
            "value",
            valittujaKuntia / kuntiaYhteensa,
            polygonSerie
          );
        } else {
          polygonSerie = dissoc("value", polygonSerie);
        }

        const kunnatVareissa = map(kunta => {
          return kunta.id === polygonSerie.id ? polygonSerie : kunta;
        }, polygonSeries.current.data);
        if (polygonSeries.current.data.length) {
          polygonSeries.current.data = {
            something: "Useless",
            maybe: {
              here: {
                values: kunnatVareissa
              }
            }
          };
        }
      }

      if (activePolygon.current) {
        labelSeries.current.disposeChildren();
        const label = labelSeries.current.mapImages.create();
        label.latitude = activePolygon.current.visualLatitude;
        label.longitude = activePolygon.current.visualLongitude;
        label.children.getIndex(0).text = `${Math.round(
          (valittujaKuntia / kuntiaYhteensa) * 100
        )} %`;
      }
    }, [cos, ids, maakuntaId, kuntiaPerMaakunta]);

    const updateChangeObjects = useCallback(
      (payload, _maakuntaId) => {
        let nextChangeObjects = [];
        const nextMaakuntaChanges =
          payload.changes.length === 1 ? [] : uniq(payload.changes);
        if (nextMaakuntaChanges.length) {
          nextChangeObjects = assoc(
            _maakuntaId || maakuntaId,
            nextMaakuntaChanges,
            cos
          );
        } else {
          nextChangeObjects = dissoc(_maakuntaId || maakuntaId, cos);
        }
        if (!equals(cos, nextChangeObjects)) {
          setCos(nextChangeObjects);
        }
      },
      [maakuntaId, cos]
    );

    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
      const shouldBeSelected = filter(location => {
        const isKunta = !!find(
          propEq("kuntaKoodiarvo", location.value),
          kuntaMaakuntaMapping
        );
        const category = find(
          propEq("anchor", location.maakuntaKey),
          categories
        );
        const isTheWholeMaakuntaSelected =
          category &&
          cos[location.maakuntaKey] &&
          cos[location.maakuntaKey].length - 1 ===
            category.categories[0].components.length;
        const anchor = isKunta
          ? `erilliset-maakunnat.${location.maakuntaKey}.kunnat.${location.value}`
          : `erilliset-maakunnat.${location.maakuntaKey}.${location.value}`;
        const changeObj = find(
          propEq("anchor", anchor),
          cos[location.maakuntaKey] || []
        );
        return (
          (!!changeObj && !isTheWholeMaakuntaSelected) ||
          (isTheWholeMaakuntaSelected && !isKunta)
        );
      }, selectedLocations);

      const kunnat = flatten(
        values(
          map(arr => {
            const maakuntaKey = getAnchorPart(arr[0].anchor, 1);
            const maakuntaAnchor = `erilliset-maakunnat.${maakuntaKey}.A`;
            const maakuntaChangeObj = find(
              propEq("anchor", maakuntaAnchor),
              arr
            );
            const maakuntaKuntineen = find(
              propEq("anchor", maakuntaKey),
              categories
            );
            const kuntienMaaraMaakunnassa =
              maakuntaKuntineen.categories[0].components.length;
            if (
              maakuntaChangeObj &&
              arr.length === kuntienMaaraMaakunnassa + 1
            ) {
              return {
                label: maakuntaChangeObj.properties.metadata.title,
                value: maakuntaChangeObj.properties.metadata.koodiarvo,
                maakuntaKey: maakuntaChangeObj.properties.metadata.maakuntaKey
              };
            } else {
              return map(changeObj => {
                if (includes(".kunnat", changeObj.anchor)) {
                  return {
                    label: changeObj.properties.metadata.title,
                    value: changeObj.properties.metadata.koodiarvo,
                    maakuntaKey: changeObj.properties.metadata.maakuntaKey
                  };
                }
                return null;
              }, arr).filter(Boolean);
            }
          }, cos)
        )
      );
      const locationsCombined = uniq(
        concat(kunnat || [], shouldBeSelected || [])
      );
      if (!equals(selectedLocations, locationsCombined)) {
        setSelectedLocations(locationsCombined);
      }
    }, [categories, cos, selectedLocations]);

    const maakuntaChanges = cos[maakuntaId] || [];

    const locale = "FI";

    const locations = useMemo(() => {
      return map(location => {
        let maakuntaKey = "";
        const metadata = find(propEq("kieli", locale), location.metadata);
        const kuntaMapping = find(
          propEq("kuntaKoodiarvo", location.koodiArvo),
          kuntaMaakuntaMapping
        );
        if (kuntaMapping) {
          maakuntaKey = kuntaMapping.maakuntaKey;
        } else {
          maakuntaKey = mapping[location.koodiArvo];
        }
        return {
          label: metadata.nimi,
          value: location.koodiArvo,
          maakuntaKey
        };
      }, concat(kunnat, maakunnat));
    }, []);

    return (
      <React.Fragment>
        <Autocomplete
          minChars={1}
          name="filter example"
          options={locations}
          isSearch
          callback={(payload, values) => {
            const prevSel = previousSelection.current;
            /**
             * If there're not any selected items all the change object must
             * be removed.
             */
            if (!values.value) {
              setCos({});
            } else {
              const cmp = (x, y) => {
                return x.value === y.value;
              };
              console.info(values.value);
              const itemsToRemove = differenceWith(
                cmp,
                prevSel || [],
                values.value
              );
              if (itemsToRemove.length) {
                const maakuntaChangeObjects = filter(
                  changeObj =>
                    changeObj.properties.metadata.koodiarvo !==
                    itemsToRemove[0].value,
                  cos[itemsToRemove[0].maakuntaKey]
                );
                updateChangeObjects(
                  {
                    changes: maakuntaChangeObjects
                  },
                  itemsToRemove[0].maakuntaKey
                );
                setMaakuntaId(last(values.value).maakuntaKey);
              } else {
                const latestSelection = last(values.value);
                // cos[latestSelection.maakuntaKey] = [];
                const isKunta = !!find(
                  propEq("kuntaKoodiarvo", latestSelection.value),
                  kuntaMaakuntaMapping
                );
                let changeObj = null;
                let maakuntaChangeObj = null;
                let kunnatChangeObjects = [];
                const maakuntaKuntineen = find(
                  propEq("anchor", latestSelection.maakuntaKey),
                  categories
                );
                if (isKunta) {
                  const anchor = isKunta
                    ? `erilliset-maakunnat.${latestSelection.maakuntaKey}.kunnat.${latestSelection.value}`
                    : "";
                  changeObj = {
                    anchor,
                    properties: {
                      isChecked: true,
                      metadata: {
                        title: latestSelection.label,
                        koodiarvo: latestSelection.value,
                        maakuntaKey: latestSelection.maakuntaKey
                      }
                    }
                  };
                  // If the selected item is kunta we have to activate its maakunta too.
                  maakuntaChangeObj = {
                    anchor: `erilliset-maakunnat.${latestSelection.maakuntaKey}.A`,
                    properties: {
                      isChecked: true,
                      isIndeterminate: true,
                      metadata: {
                        title:
                          maakuntaKuntineen.components[0].properties
                            .forChangeObject.title,
                        koodiarvo:
                          maakuntaKuntineen.components[0].properties
                            .forChangeObject.koodiarvo,
                        maakuntaKey: maakuntaKuntineen.anchor
                      }
                    }
                  };
                } else {
                  changeObj = {
                    anchor: `erilliset-maakunnat.${latestSelection.maakuntaKey}.A`,
                    properties: {
                      isChecked: true,
                      isIndeterminate: false,
                      metadata: {
                        title: latestSelection.label,
                        koodiarvo: latestSelection.value,
                        maakuntaKey: latestSelection.maakuntaKey
                      }
                    }
                  };
                  if (maakuntaKuntineen) {
                    kunnatChangeObjects = map(kunta => {
                      return {
                        anchor: `erilliset-maakunnat.${latestSelection.maakuntaKey}.kunnat.${kunta.anchor}`,
                        properties: {
                          isChecked: true,
                          metadata: {
                            title: kunta.properties.forChangeObject.title,
                            koodiarvo:
                              kunta.properties.forChangeObject.koodiarvo,
                            maakuntaKey: latestSelection.maakuntaKey
                          }
                        }
                      };
                    }, maakuntaKuntineen.categories[0].components);
                  }
                }
                const changeObjects = uniq(
                  flatten([
                    [changeObj, maakuntaChangeObj].filter(Boolean),
                    cos[latestSelection.maakuntaKey] || [],
                    kunnatChangeObjects
                  ])
                );
                updateChangeObjects(
                  {
                    changes: changeObjects
                  },
                  latestSelection.maakuntaKey
                );
                setMaakuntaId(latestSelection.maakuntaKey);
              }
            }
            previousSelection.current = values.value;
          }}
          value={selectedLocations}
        />
        <div className="bg-white border overflow-auto p-4">
          <div className="mt-12 p-4 flex">
            <div
              id="finland_map"
              ref={kartta}
              className="flex-1"
              style={{ height: "700px" }}></div>
            <div className="flex-1">
              {maakuntaCategories.length > 0 ? (
                <CategorizedListRoot
                  anchor={anchor}
                  categories={maakuntaCategories}
                  changes={maakuntaChanges}
                  onUpdate={updateChangeObjects}></CategorizedListRoot>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

CategoryFilter.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changeObjects: PropTypes.array,
  onChanges: PropTypes.func
};

export default CategoryFilter;
