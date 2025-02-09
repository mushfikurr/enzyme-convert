import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <>
      <RouterProvider router={router} />
      {import.meta.env.MODE === "development" && (
        <TanStackRouterDevtools router={router} />
      )}
    </>
  );
}
