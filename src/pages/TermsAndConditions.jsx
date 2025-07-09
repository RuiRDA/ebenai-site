import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 text-n-2">
      <h1 className="h1 mb-4">{t('terms.title')}</h1>
      <p className="text-sm text-n-4 mb-8">{t('terms.lastUpdated')}</p>

      <div className="space-y-8">
        <p>{t('terms.introduction')}</p>

        <section>
          <h2 className="h2 mb-2">{t('terms.useOfService.title')}</h2>
          <p>{t('terms.useOfService.content')}</p>
        </section>

        <section>
          <h2 className="h2 mb-2">{t('terms.intellectualProperty.title')}</h2>
          <p>{t('terms.intellectualProperty.content')}</p>
        </section>

        <section>
          <h2 className="h2 mb-2">{t('terms.limitationOfLiability.title')}</h2>
          <p>{t('terms.limitationOfLiability.content')}</p>
        </section>

        <section>
          <h2 className="h2 mb-2">{t('terms.governingLaw.title')}</h2>
          <p>{t('terms.governingLaw.content')}</p>
        </section>

        <hr className="my-12 border-n-6" />

        <section>
          <h2 className="h2 mb-4">{t('terms.privacyPolicy.title')}</h2>
          <p className="mb-6">{t('terms.privacyPolicy.introduction')}</p>

          <div className="space-y-6">
            <article>
              <h3 className="h3 mb-2">{t('terms.privacyPolicy.informationWeCollect.title')}</h3>
              <p>{t('terms.privacyPolicy.informationWeCollect.content')}</p>
            </article>
            <article>
              <h3 className="h3 mb-2">{t('terms.privacyPolicy.howWeUseYourInformation.title')}</h3>
              <p>{t('terms.privacyPolicy.howWeUseYourInformation.content')}</p>
            </article>
            <article>
              <h3 className="h3 mb-2">{t('terms.privacyPolicy.dataSecurity.title')}</h3>
              <p>{t('terms.privacyPolicy.dataSecurity.content')}</p>
            </article>
            <article>
              <h3 className="h3 mb-2">{t('terms.privacyPolicy.yourRights.title')}</h3>
              <p>{t('terms.privacyPolicy.yourRights.content')}</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;