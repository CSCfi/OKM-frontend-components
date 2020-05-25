export function getAnchor(baseAnchor, maakuntaKey, koodiarvo) {
  return "".concat(baseAnchor, ".").concat(maakuntaKey, ".kunnat.").concat(koodiarvo);
}
export function getAdditionChangeObj(baseAnchor, maakuntaKey, title, koodiarvo) {
  return {
    anchor: getAnchor(baseAnchor, maakuntaKey, koodiarvo),
    properties: {
      isChecked: true,
      metadata: {
        title: title,
        koodiarvo: koodiarvo,
        maakuntaKey: maakuntaKey
      }
    }
  };
}
export function getRemovalChangeObj(baseAnchor, maakuntaKey, koodiarvo, title) {
  return {
    anchor: getAnchor(baseAnchor, maakuntaKey, koodiarvo),
    properties: {
      isChecked: false,
      isIndeterminate: false,
      metadata: {
        koodiarvo: koodiarvo,
        maakuntaKey: maakuntaKey,
        title: title
      }
    }
  };
}