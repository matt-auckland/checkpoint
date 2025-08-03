import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePageTitle } from '~/context/PageTitleContext';

export default function TeamSettingsRoute() {
  const [searchParams] = useSearchParams();
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();

  useEffect(() => {
    const teamId = searchParams.get('id');

    if (!teamId) {
      navigate('/');
    }

    setTitle(`Team ${teamId ?? 'Unknown'} Settings`);
  }, [searchParams, setTitle]);

  return <></>;
}
