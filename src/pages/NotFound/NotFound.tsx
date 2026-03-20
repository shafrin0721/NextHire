import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const NotFound = (): JSX.Element => {
    return (
        <div className="flex flex-col w-full bg-white">
            <main className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                <h1 className="text-9xl font-bold text-blue-600 mb-4 [font-family:'Inter',Helvetica]">404</h1>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6 [font-family:'Inter',Helvetica]">Page Not Found</h2>
                <p className="text-gray-500 max-w-md mb-8 [font-family:'Inter',Helvetica] text-lg">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-lg text-white font-medium">
                    <Link to="/">Back to Home</Link>
                </Button>
            </main>
        </div>
    );
};
