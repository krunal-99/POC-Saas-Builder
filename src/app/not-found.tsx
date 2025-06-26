import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBlueprint } from "../lib/blueprint";

const NotFound = async () => {
  const blueprint = await getBlueprint();
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link href="/">
          <Button
            className="bg-primary text-white hover:bg-primary/90 cursor-pointer"
            style={{ backgroundColor: blueprint.theme.primary }}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
