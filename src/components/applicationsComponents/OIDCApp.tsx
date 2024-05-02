import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppPage.css";
import { OptionOidc } from "./OptionOidc";
import { TableVars } from "./TableVars";
import {
  delOIDCRPMetaDataMacros,
  delOidcRPMetaDataExportedVars,
  newOIDCRPMetaDataMacros,
  newOidcRPMetaDataExportedVars,
  updateOIDCRPMetaDataMacros,
  updateOidcMetaDataOptions,
  updateOidcRPMetaDataExportedVars,
} from "../../features/config/configSlice";

function updateExpAttr(tableID: string) {
  const attrList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const name = cells[0].querySelector("input")?.value;
      const varName = cells[1].querySelector("input")?.value;
      const type = cells[2].querySelector("select")?.value;
      const array = cells[3].querySelector("select")?.value;

      attrList[name ? name : ""] = `${varName};${type};${array}`;
    }
  }

  return attrList;
}

function ExportedAttribute(appName: string, vars: Record<string, string>) {
  let i = 0;
  const dispatch = useAppDispatch();
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        i++;
        const [name, type, table] = vars[key].split(";");
        return (
          <tr key={i}>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateOidcRPMetaDataExportedVars({
                      appName,
                      data: updateExpAttr("exportedVars"),
                    })
                  )
                }
                type="text"
                value={key}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateOidcRPMetaDataExportedVars({
                      appName,
                      data: updateExpAttr("exportedVars"),
                    })
                  )
                }
                type="text"
                value={name}
              />
            </td>
            <td>
              <select
                value={String(type)}
                onChange={() =>
                  dispatch(
                    updateOidcRPMetaDataExportedVars({
                      appName,
                      data: updateExpAttr("exportedVars"),
                    })
                  )
                }
              >
                <option value="string">{t("string")}</option>
                <option value="int">{t("int")}</option>
                <option value="bool">{t("bool")}</option>
              </select>
            </td>
            <td>
              <select
                value={String(table)}
                onChange={() =>
                  dispatch(
                    updateOidcRPMetaDataExportedVars({
                      appName,
                      data: updateExpAttr("exportedVars"),
                    })
                  )
                }
              >
                <option value="auto">{t("auto")}</option>
                <option value="always">{t("always")}</option>
                <option value="never">{t("never")}</option>
              </select>
            </td>
            <td>
              <button
                className="minus"
                onClick={() =>
                  dispatch(delOidcRPMetaDataExportedVars({ appName, key: key }))
                }
              >
                -
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export function OIDCApp({ name }: { name: string }) {
  const data = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataOptionsBasic")}</strong>
          <table>
            <tbody>
              <tr>
                <th>{t("oidcRPMetaDataOptionsPublic")}</th>
                <td>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="oidcRPMetaDataOptionsPublic"
                        value={1}
                        checked={Boolean(
                          data.oidcRPMetaDataOptions[name]
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsPublic
                            : 0
                        )}
                        onChange={() => {
                          dispatch(
                            updateOidcMetaDataOptions({
                              name,
                              option: "oidcRPMetaDataOptionsPublic",
                              value: 1,
                            })
                          );
                        }}
                      />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="oidcRPMetaDataOptionsPublic"
                        value={0}
                        checked={
                          !Boolean(
                            data.oidcRPMetaDataOptions[name]
                              ? data.oidcRPMetaDataOptions[name]
                                  .oidcRPMetaDataOptionsPublic
                              : 0
                          )
                        }
                        onChange={() => {
                          dispatch(
                            updateOidcMetaDataOptions({
                              name,
                              option: "oidcRPMetaDataOptionsPublic",
                              value: 0,
                            })
                          );
                        }}
                      />
                      <span>{t("off")}</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsClientID")}</th>
                <td>
                  <input
                    className="form"
                    type="text"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsClientID
                    )}
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsClientID",
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsClientSecret")}</th>
                <td>
                  <input
                    className="form"
                    type="number"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsClientSecret
                    )}
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsClientSecret",
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsRedirectUris")}</th>
                <td>
                  <input
                    type="text"
                    name="oidcRPMetaDataOptionsRedirectUris"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsRedirectUris
                    )}
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsRedirectUris",
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsAuthMethod")}</th>
                <td>
                  <input
                    type="text"
                    name="oidcRPMetaDataOptionsAuthMethod"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAuthMethod
                    )}
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsAuthMethod",
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsDisplay")}</th>
                <td>
                  <input
                    type="text"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsDisplay
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsDisplay
                        : ""
                    )}
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsDisplay",
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsIcon")}</th>
                <td>
                  <input
                    type="text"
                    value={String(
                      data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsIcon
                    )}
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsIcon",
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataExportedVars")}</strong>
          <button
            className="plus"
            onClick={() => dispatch(newOidcRPMetaDataExportedVars(name))}
          >
            +
          </button>
          <table id="exportedVars">
            <thead>
              <tr>
                <th>{t("claimName")}</th>
                <th>{t("variableName")}</th>
                <th>{t("type")}</th>
                <th>{t("array")}</th>
              </tr>
            </thead>
            {data.oidcRPMetaDataExportedVars
              ? ExportedAttribute(name, data.oidcRPMetaDataExportedVars[name])
              : ""}
          </table>
          <button
            className="plus"
            onClick={() => dispatch(newOidcRPMetaDataExportedVars(name))}
          >
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataMacros")}</strong>
          <button
            className="plus"
            onClick={() => dispatch(newOIDCRPMetaDataMacros(name))}
          >
            +
          </button>
          <table id="oidcRPMetaDataMacros">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
              </tr>
            </thead>
            {data.oidcRPMetaDataMacros
              ? TableVars(
                  name,
                  data.oidcRPMetaDataMacros[name],
                  "oidcRPMetaDataMacros",
                  delOIDCRPMetaDataMacros,
                  updateOIDCRPMetaDataMacros
                )
              : ""}
          </table>
          <button
            className="plus"
            onClick={() => dispatch(newOIDCRPMetaDataMacros(name))}
          >
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataOptions")}</strong>
          <OptionOidc name={name} />
        </div>
      </div>
    </div>
  );
}
