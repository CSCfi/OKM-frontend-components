import { find, propEq, includes, values, mapObjIndexed, equals } from "ramda";

function Municipality(baseAnchor, municipality) {
  var _municipality$propert = municipality.properties.forChangeObject,
      koodiarvo = _municipality$propert.koodiarvo,
      provinceId = _municipality$propert.maakuntaKey,
      title = _municipality$propert.title;
  var anchor = "".concat(baseAnchor, ".").concat(provinceId, ".kunnat.").concat(koodiarvo);
  var _municipality$propert2 = municipality.properties,
      isCheckedByDefault = _municipality$propert2.isChecked,
      name = _municipality$propert2.name;

  function getChangeObject() {
    var currentChangeObjProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var targetProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var originalProperties = municipality.properties;
    var isOriginalOK = !includes(false, values(mapObjIndexed(function (value, key) {
      return equals(originalProperties[key], value) ? true : false;
    }, targetProperties)));
    var isCurrentChangeObjOK = !includes(false, values(mapObjIndexed(function (value, key) {
      return equals(currentChangeObjProps[key], value) ? true : false;
    }, targetProperties)));

    if (isOriginalOK) {
      return null;
    } else {
      if (isCurrentChangeObjOK) {
        return {
          anchor: anchor,
          properties: currentChangeObjProps
        };
      } else {
        var changeObj = {
          anchor: anchor,
          properties: Object.assign({}, currentChangeObjProps, targetProperties, {
            metadata: {
              title: title,
              koodiarvo: koodiarvo,
              provinceKey: provinceId
            }
          })
        };
        return changeObj;
      }
    }
  }

  return {
    isActive: function isActive() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var changeObj = find(propEq("anchor", anchor), changeObjects);
      return isCheckedByDefault && !changeObj || changeObj && changeObj.properties.isChecked;
    },
    isDeactive: function isDeactive() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var changeObj = find(propEq("anchor", anchor), changeObjects);
      return !!(!isCheckedByDefault && !changeObj || changeObj && !changeObj.properties.isChecked);
    },
    getAnchor: function getAnchor() {
      return anchor;
    },
    getChangeObject: getChangeObject,
    getKoodiarvo: function getKoodiarvo() {
      return koodiarvo;
    },
    getName: function getName() {
      return name;
    },
    getRemovalChangeObject: function getRemovalChangeObject() {
      return {
        anchor: anchor,
        properties: {
          isChecked: false,
          isIndeterminate: false,
          metadata: {
            koodiarvo: koodiarvo,
            maakuntaKey: provinceId,
            title: title
          }
        }
      };
    },
    getTitle: function getTitle() {
      return title;
    }
  };
}

export default Municipality;