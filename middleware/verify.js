export default function ({ app: { i18n }, store, redirect, route }) {
  const locale = i18n.locale === i18n.defaultLocale ? "" : "/" + i18n.locale;
  // const pages = route.name.includes("login");
  const verify = store.getters.user?.emailVerified ?? null;
  if (store.getters.token && !verify) {
    console.log("redirect to balance main..");
    redirect(`${locale}/my`);
  }
}
