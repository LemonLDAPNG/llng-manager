export function ruleSAML(samlData: Record<string, string>): boolean {
  return samlData.samlSPMetaDataXML ? true : false;
}
export function ruleOIDC(
  oidcData: Record<string, string | number | boolean>
): boolean {
  return (
    (oidcData.oidcRPMetaDataOptionsClientID ? true : false) &&
    (oidcData.oidcRPMetaDataOptionsPublic
      ? true
      : false || oidcData.oidcRPMetaDataOptionsClientSecret
      ? true
      : false)
  );
}

export function ruleCAS(
  casData: Record<string, string | number | boolean>
): boolean {
  return true;
}
