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

function HexToRgb(hexstr) {
  var a = [];
  hexstr = hexstr.replace(/[^0-9a-f]+/gi, "");
  if (hexstr.length == 3) {
    a = hexstr.split("");
  } else if (hexstr.length == 6) {
    a = hexstr.match(/(\w{2})/g);
  } else {
    throw "invalid input, hex string must be in the format #FFFFFF or #FFF";
  }
  return a.map(function(x) {
    return parseInt(x, 16);
  });
}

function IntToHex(i) {
  var hex = i.toString(16);
  if (hex.length == 1) hex = "0" + hex;
  return hex;
}

function Mix(colorA, colorB, weight) {
  var a = HexToRgb(colorA);
  var b = HexToRgb(colorB);

  var c0 = Math.round((a[0] + Math.abs(a[0] - b[0]) * weight) % 255);
  var c1 = Math.round((a[1] + Math.abs(a[1] - b[1]) * weight) % 255);
  var c2 = Math.round((a[2] + Math.abs(a[2] - b[2]) * weight) % 255);

  return "#" + IntToHex(c0) + IntToHex(c1) + IntToHex(c2);
}

const CategoryFilter = React.memo(
  ({
    anchor: baseAnchor = "no-anchor-defined",
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
    const polygonTemplate = useRef(null);

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

    function getKunnatVareissa() {
      return polygonSeries.current.data;
    }

    useEffect(() => {
      onChanges(cos);
    }, [cos, onChanges]);

    useEffect(() => {
      kartta.current = am4core.create("finland_map", am4maps.MapChart);
      kartta.current.geodata = am4geodata_finland;
      // Set projection
      kartta.current.projection = new am4maps.projections.Miller();

      kartta.current.geodataNames = am4geodata_lang_FI;
      // kartta.current.responsive.enabled = true;

      // Create map polygon series
      polygonSeries.current = kartta.current.series.push(
        new am4maps.MapPolygonSeries()
      );

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.current.useGeodata = true;

      // Add expectancy data
      polygonSeries.current.events.on("beforedatavalidated", function(ev) {
        var source = ev.target.data;
        if (source.maybe) {
          ev.target.data = source.maybe.here.values;
        }
      });

      polygonSeries.current.data = {
        something: "Useless",
        maybe: {
          here: {
            values: getKunnatVareissa()
          }
        }
      };

      // Configure series
      polygonTemplate.current = polygonSeries.current.mapPolygons.template;
      polygonTemplate.current.tooltipText = "{name}";
      polygonTemplate.current.fill = am4core.color("#dadada");

      // Create active state
      const activeState = polygonTemplate.current.states.create("active");
      activeState.properties.stroke = am4core.color("#367B25");

      polygonTemplate.current.events.on("hit", function(e) {
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
      activePolygon.current = polygonSeries.current.getPolygonById(maakuntaId);

      let polygonSerie = find(
        propEq("id", maakuntaId),
        polygonSeries.current.data
      );

      if (polygonSerie) {
        polygonSerie.fill = am4core.color("#ff0000");
      }

      const valittujaKuntia = Math.max(
        filter(changeObj => {
          return changeObj.properties.isChecked;
        }, cos[maakuntaId] || []).length - 1, // Maakunta excluded
        0
      );

      const kuntiaYhteensa = (
        find(propEq("id", maakuntaId), kuntiaPerMaakunta) || {}
      ).amount;

      const percentage = valittujaKuntia / kuntiaYhteensa;

      if (kuntiaYhteensa) {
        polygonSerie = assoc(
          "value",
          valittujaKuntia / kuntiaYhteensa,
          polygonSerie
        );
      } else {
        polygonSerie = dissoc("value", polygonSerie);
      }

      if (activePolygon.current) {
        let fillColor = "#dadada";
        if (percentage > 0 && percentage < 1) {
          fillColor = Mix("#109F52", "#BCE4CF", 1 - percentage);
        } else if (percentage === 1) {
          fillColor = "#109F52";
        }

        activePolygon.current.fill = am4core.color(fillColor);

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
          ? `${baseAnchor}.${location.maakuntaKey}.kunnat.${location.value}`
          : `${baseAnchor}.${location.maakuntaKey}.${location.value}`;
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
            const maakuntaAnchor = `${baseAnchor}.${maakuntaKey}.A`;
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
                maakuntaKey: maakuntaChangeObj.properties.metadata.maakuntaKey,
                isKunta: false
              };
            } else {
              return map(changeObj => {
                if (includes(".kunnat", changeObj.anchor)) {
                  return {
                    label: changeObj.properties.metadata.title,
                    value: changeObj.properties.metadata.koodiarvo,
                    maakuntaKey: changeObj.properties.metadata.maakuntaKey,
                    isKunta: true
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
      previousSelection.current = locationsCombined;
      if (!equals(selectedLocations, locationsCombined)) {
        setSelectedLocations(locationsCombined);
      }
    }, [categories, cos, selectedLocations]);

    const maakuntaChanges = cos[maakuntaId] || [];

    const locale = "FI";

    const locations = useMemo(() => {
      function getValittavissaOlevat(options, isKunta, selectedLocations) {
        return map(location => {
          let okToList = true;
          let maakuntaKey = "";
          let kuntaMapping = null;
          const metadata = find(propEq("kieli", locale), location.metadata);
          if (isKunta) {
            kuntaMapping = find(
              propEq("kuntaKoodiarvo", location.koodiArvo),
              kuntaMaakuntaMapping
            );
            if (kuntaMapping) {
              maakuntaKey = kuntaMapping.maakuntaKey;
              const maakunta = find(
                l => l.maakuntaKey === maakuntaKey && l.isKunta === false,
                selectedLocations
              );
              const isMaakuntaSelected = !!maakunta;
              okToList = !isMaakuntaSelected;
            }
          } else {
            maakuntaKey = mapping[location.koodiArvo];
          }
          return okToList
            ? {
                label: metadata.nimi,
                value: location.koodiArvo,
                maakuntaKey,
                isKunta
              }
            : null;
        }, options).filter(Boolean);
      }

      const valittavissaOlevat = {
        kunnat: getValittavissaOlevat(kunnat, true, selectedLocations),
        maakunnat: getValittavissaOlevat(maakunnat, false, selectedLocations)
      };

      return concat(valittavissaOlevat.kunnat, valittavissaOlevat.maakunnat);
    }, [selectedLocations]);

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
              setMaakuntaId(prevSel[0].maakuntaKey);
              setCos({});
            } else {
              const cmp = (x, y) => {
                return x.value === y.value;
              };
              const itemsToRemove = differenceWith(
                cmp,
                prevSel || [],
                values.value
              );
              if (itemsToRemove.length) {
                setMaakuntaId(itemsToRemove[0].maakuntaKey);
                const isKunta = !!find(
                  propEq("kuntaKoodiarvo", itemsToRemove[0].value),
                  kuntaMaakuntaMapping
                );

                const currentMaakuntaPolygon = polygonSeries.current.getPolygonById(
                  itemsToRemove[0].maakuntaKey
                );

                setMaakuntaId(currentMaakuntaPolygon.dataItem.dataContext.id);

                if (isKunta) {
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
                } else {
                  // Maakunnan poisto
                  const nextCos = dissoc(itemsToRemove[0].maakuntaKey, cos);
                  setCos(nextCos);
                }
              } else {
                const latestSelection = last(values.value);
                let changeObjectsWithCurrentMaakuntaKey =
                  cos[latestSelection.maakuntaKey];
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
                    ? `${baseAnchor}.${latestSelection.maakuntaKey}.kunnat.${latestSelection.value}`
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
                    anchor: `${baseAnchor}.${latestSelection.maakuntaKey}.A`,
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
                  changeObjectsWithCurrentMaakuntaKey = [];
                  changeObj = {
                    anchor: `${baseAnchor}.${latestSelection.maakuntaKey}.A`,
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
                        anchor: `${baseAnchor}.${latestSelection.maakuntaKey}.kunnat.${kunta.anchor}`,
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
                    changeObjectsWithCurrentMaakuntaKey || [],
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
        <div className="bg-white border overflow-auto px-2">
          <div className="mt-12 p-4 flex">
            <div
              id="finland_map"
              ref={kartta}
              className="flex-1"
              style={{ height: "700px" }}></div>
            <div className="flex-2">
              {maakuntaCategories.length > 0 ? (
                <CategorizedListRoot
                  anchor={baseAnchor}
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
