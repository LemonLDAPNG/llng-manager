import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delCASAppMetaDataMacros,
  delCASexportedVars,
  newCASAppMetaDataMacros,
  newCASexportedVars,
  updateCASAppMetaDataMacros,
  updateCASOptions,
  updateCASexportedVars,
} from "../../features/config/configSlice";
import definitions from "../../static/definitions.json";
import "./AppPage.css";
import { TableVars } from "./TableVars";

export function CasApp({ name }: { name: string }) {
  const vars = useAppSelector((state) =>
    state.config.data.config.casAppMetaDataExportedVars
      ? state.config.data.config.casAppMetaDataExportedVars[name]
      : {}
  );
  const casAppMetaDataMacros = useAppSelector((state) => {
    return state.config.data.config.casAppMetaDataMacros
      ? state.config.data.config.casAppMetaDataMacros[name]
      : {};
  });
  const casAppMetaDataOptions = useAppSelector((state) => {
    return state.config.data.config.casAppMetaDataOptions
      ? state.config.data.config.casAppMetaDataOptions[name]
      : {};
  });
  const [optionSelected, setOptionSelected] = useState("basic");
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="optionNavbar">
        <label
          className={`option ${optionSelected === "basic" ? "selected" : ""}`}
          onClick={() => setOptionSelected("basic")}
        >
          {t("Basic Option")}
        </label>
        <label
          className={`option ${
            optionSelected === "casAppMetaDataExportedVars" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("casAppMetaDataExportedVars")}
        >
          {t("casAppMetaDataExportedVars")}
        </label>
        <label
          className={`option ${
            optionSelected === "casAppMetaDataMacros" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("casAppMetaDataMacros")}
        >
          {t("casAppMetaDataMacros")}
        </label>
        <label
          className={`option ${
            optionSelected === "casAppMetaDataOptions" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("casAppMetaDataOptions")}
        >
          {t("casAppMetaDataOptions")}
        </label>
      </div>
      <div className="appDesc">
        {optionSelected === "casAppMetaDataExportedVars" && (
          <div className="box">
            <strong className="title2">
              {t("casAppMetaDataExportedVars")}
            </strong>

            <table id="exportedVars">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataExportedVars}
                      </Markdown>
                    }
                  >
                    <th>{t("values")}</th>
                  </Tooltip>
                  <th>
                    <Button
                      className="plus"
                      onClick={() => dispatch(newCASexportedVars(name))}
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              {TableVars(
                name,
                vars,
                "exportedVars",
                dispatch,
                delCASexportedVars,
                updateCASexportedVars
              )}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newCASexportedVars(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "casAppMetaDataMacros" && (
          <div className="box">
            <strong className="title2">{t("casAppMetaDataMacros")}</strong>

            <table id="macros">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>
                    <Tooltip
                      title={
                        <Markdown>{definitions.casAppMetaDataMacros}</Markdown>
                      }
                    >
                      <th>{t("values")}</th>
                    </Tooltip>
                  </th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() => dispatch(newCASAppMetaDataMacros(name))}
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              {TableVars(
                name,
                casAppMetaDataMacros,
                "macros",
                dispatch,
                delCASAppMetaDataMacros,
                updateCASAppMetaDataMacros
              )}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newCASAppMetaDataMacros(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "casAppMetaDataOptions" && (
          <div className="box">
            <strong className="title2">{t("casAppMetaDataOptions")}</strong>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataOptionsDisplayName
                          ? definitions.casAppMetaDataOptionsDisplayName
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("casAppMetaDataOptionsDisplayName")}</th>
                  </Tooltip>

                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsDisplayName
                          ? casAppMetaDataOptions.casAppMetaDataOptionsDisplayName
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsDisplayName",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataOptionsService}
                      </Markdown>
                    }
                  >
                    <th>{t("casAppMetaDataOptionsService")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsService
                          ? casAppMetaDataOptions.casAppMetaDataOptionsService
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsService",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataOptionsLogout
                          ? definitions.casAppMetaDataOptionsLogout
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("casAppMetaDataOptionsLogout")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          casAppMetaDataOptions.casAppMetaDataOptionsLogout
                        }
                        onChange={(e) => {
                          dispatch(
                            updateCASOptions({
                              name,
                              option: "casAppMetaDataOptionsLogout",
                              value: Number(e.target.value),
                            })
                          );
                        }}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                        <FormControlLabel
                          value={-1}
                          control={<Radio />}
                          label={t("default")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataOptionsAuthnLevel}
                      </Markdown>
                    }
                  >
                    <th>{t("casAppMetaDataOptionsAuthnLevel")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="number"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsAuthnLevel
                          ? casAppMetaDataOptions.casAppMetaDataOptionsAuthnLevel
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsAuthnLevel",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataOptionsRule}
                      </Markdown>
                    }
                  >
                    <th>{t("casAppMetaDataOptionsRule")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsRule
                          ? casAppMetaDataOptions.casAppMetaDataOptionsRule
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsRule",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.casAppMetaDataOptionsComment}
                      </Markdown>
                    }
                  >
                    <th>{t("casAppMetaDataOptionsComment")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      variant="filled"
                      size="small"
                      margin="normal"
                      multiline
                      fullWidth
                      rows={4}
                      className="form"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsComment
                          ? casAppMetaDataOptions.casAppMetaDataOptionsComment
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsComment",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
