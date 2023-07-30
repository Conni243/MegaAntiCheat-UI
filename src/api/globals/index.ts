import { getAllSettings } from '@api/preferences';

export const port = 3621;
export const APIURL = `http://localhost:${port}/mac`;
export const SERVERFETCH = `${APIURL}/game/v1`;
export const PLAYERFETCH = `${APIURL}/user/v1`;
export const HISTORYFETCH = `${APIURL}/history/v1`;
export const PREF_ENDPOINT = `${APIURL}/pref/v1`;
export const USER_ENDPOINT = `${APIURL}/user/v1`;

export const useFakedata = process.env.REACT_APP_USE_FAKEDATA ?? false;

export async function verifyBackend(): Promise<boolean> {
  return await fetch(SERVERFETCH)
    .then((res) => res.ok)
    .catch(() => false);
}

export async function isBackendConfigured(): Promise<boolean> {
  const settings = await getAllSettings();
  const steamAPIKey = settings.internal?.steamApiKey;
  const RConPassword = settings.internal?.rconPassword;

  // We can't have the default values, see them as not configured.
  if (!steamAPIKey || steamAPIKey === 'YOUR_API_KEY_HERE') return false;
  if (!RConPassword) return false;

  return true;
}
