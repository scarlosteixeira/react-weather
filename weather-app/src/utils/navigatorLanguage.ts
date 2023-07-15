export default function getNavigatorLanguage():string | undefined{
  const language = window.navigator.language
  if (!language) return undefined
  return language
}
