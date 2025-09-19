import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "@/Pages/CategoryPage";

export const Route = createFileRoute("/category/$category")({
  component: CategoryPage,
});
