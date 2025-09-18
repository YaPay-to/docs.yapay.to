import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  icon: string;
  description: JSX.Element;
  link: string;
};

const APIFeatures: FeatureItem[] = [
  {
    title: 'Payment Intents',
    icon: '💳',
    description: (
      <>
        Create and manage payment intents with support for multiple payment methods including cards and bank transfers.
      </>
    ),
    link: '/docs/api/payments',
  },
  {
    title: 'Checkout Sessions',
    icon: '🛒',
    description: (
      <>
        Host secure payment pages with our ready-to-use checkout interface for quick implementation.
      </>
    ),
    link: '/docs/api/checkout',
  },
  {
    title: 'Webhooks',
    icon: '🔔',
    description: (
      <>
        Receive real-time notifications about payment events with secure webhook signatures.
      </>
    ),
    link: '/docs/api/webhooks',
  },
];

const PlatformFeatures: FeatureItem[] = [
  {
    title: 'Quick Start Guide',
    icon: '🚀',
    description: (
      <>
        Get up and running with YaPay in minutes with our step-by-step integration guide.
      </>
    ),
    link: '/docs/guides/quickstart',
  },
  {
    title: 'Authentication',
    icon: '🔐',
    description: (
      <>
        Learn how to authenticate API requests using Bearer tokens and manage API keys.
      </>
    ),
    link: '/docs/authentication',
  },
  {
    title: 'Testing',
    icon: '🧪',
    description: (
      <>
        Test your integration safely with test mode, test cards, and sandbox environment.
      </>
    ),
    link: '/docs/testing',
  },
];

function Feature({title, icon, description, link}: FeatureItem) {
  return (
    <Link to={link} className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDescription}>{description}</p>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            API Documentation
          </Heading>
          <div className={styles.featureGrid}>
            {APIFeatures.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            Platform Documentation
          </Heading>
          <div className={styles.featureGrid}>
            {PlatformFeatures.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <Heading as="h2" className={styles.ctaTitle}>
              Ready to start accepting payments?
            </Heading>
            <p className={styles.ctaDescription}>
              Join thousands of businesses using YaPay to process payments across Latin America and beyond.
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--primary button--lg"
                to="/guides/quickstart">
                Start Integration
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://yapay.to">
                Visit Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}