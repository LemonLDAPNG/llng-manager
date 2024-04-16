import { combineReducers, configureStore } from "@reduxjs/toolkit";
import configReducer from "../features/config/configSlice";
import creationAssistantReducer from "../features/creationAssistantSlice";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
  config: configReducer,
  creationAssistant: creationAssistantReducer,
  router: routerReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routerMiddleware),
  });
};

export const store = setupStore();

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
