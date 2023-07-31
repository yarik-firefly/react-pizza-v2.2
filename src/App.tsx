import React from "react";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import MainLayout from "./layout/MainLayout";

const NotFound = React.lazy(
  () =>
    import(
      /* webpackChunkName: "NotFound" */ "./components/pages/NotFound/NotFound"
    )
);

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./components/Cart")
);
const FullPizza = React.lazy(
  () =>
    import(/* webpackChunkName: "FullPizza" */ "./components/pages/FullPizza")
);
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/cart"
          element={
            <React.Suspense fallback={<div>Идёт Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/pizza/:id"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
