import { notFound } from 'next/navigation';
import { getBlueprint } from '@/lib/blueprint';

export async function generateStaticParams() {
  const blueprint = await getBlueprint();
  return blueprint.pages.map((page) => ({
    route: page.route === '/' ? [] : page.route.split('/').filter(Boolean),
  }));
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ route?: string[] }>;
}) {
   const { route } = await params;
  const blueprint = await getBlueprint();
  const currentRoute = route ? `/${route.join("/")}` : "/";
  const pageExists = blueprint.pages.some((page) => page.route === currentRoute);

  if (!pageExists) {
    notFound();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        background: `linear-gradient(135deg, ${blueprint.theme.primary}20, #ffffff)`,
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full transform transition-all hover:scale-[1.02] duration-300">
        <h1
          className="text-4xl font-extrabold text-center mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(45deg, ${blueprint.theme.primary}, ${blueprint.theme.primary}80)`,
          }}
        >
          {currentRoute === '/' ? 'Welcome to the Home Page' : `Welcome to ${currentRoute}`}
        </h1>
        {currentRoute !== '/' && (
          <p className="mt-6 text-lg text-gray-600 text-center leading-relaxed">
            This is the {currentRoute} page. Explore and enjoy the content!
          </p>
        )}
      </div>
    </div>
  );
}
