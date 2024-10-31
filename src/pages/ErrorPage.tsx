import { Button } from '@components/ui/button';
import TopBar from '../components/ui/TopBar';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col size-full">
      <TopBar />
      <div className="flex flex-1 items-center justify-center bg-gray-950 dark:bg-gray-950 text-gray-50 p-4">
        <div className="max-w-md w-full text-center flex flex-col gap-8 items-center">
          <img
            src="../../public/404.png"
            width={640}
            height={480}
            alt="404 Illustration"
            className="mx-auto aspect-video rounded-lg object-cover"
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Oops! Page not found.</h1>
            <p className="text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
          </div>
          <Button
            variant="default"
            onClick={() => {
              navigate('/');
            }}
          >
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
}
