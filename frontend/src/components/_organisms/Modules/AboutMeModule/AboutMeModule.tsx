import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

import styles from './AboutMe.module.css';

export const AboutMeModule = () => {
  return (
    <ModuleSectionWrapper className={styles.aboutMe}>
      <FeaturedHeaderBlock
        eyebrow="About"
        title="A bit about me"
      >
        <div className={styles.aboutMe__introWrapper}>
          <div className={styles.aboutMe__intro}>
            <p>
              I&#39;m a senior frontend engineer based in London, focused on the
              parts of the web that users feel but rarely notice — load time,
              input latency, and interfaces that hold up under real-world
              conditions.
            </p>
            <p>
              Most of my work lives at the intersection of design systems and
              performance engineering.
            </p>
          </div>
          <div>
            <div className={styles.aboutMe__principlesLabel}>How I work</div>
            <ul className={styles.aboutMe__principlesList}>
              <li className={styles.aboutMe__principle}>
                <div className={styles.aboutMe__principleTitle}>
                  Performance budgets, not afterthoughts
                </div>
                <div className={styles.aboutMe__principleSub}>
                  Measured from the first commit.
                </div>
              </li>
              <li className={styles.aboutMe__principle}>
                <div className={styles.aboutMe__principleTitle}>
                  Accessibility by default
                </div>
                <div className={styles.aboutMe__principleSub}>
                  A baseline, never a retrofit.
                </div>
              </li>
              <li className={styles.aboutMe__principle}>
                <div className={styles.aboutMe__principleTitle}>
                  Boring tech where it counts
                </div>
                <div className={styles.aboutMe__principleSub}>
                  Novelty only where it earns its place.
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.aboutMe__stack}>
          <div className={styles.aboutMe__stackLabel}>Tech stack</div>
          <div className={styles.aboutMe__stackRows}>
            <div className={styles.aboutMe__stackRow}>
              <span className={styles.aboutMe__stackCategory}>Languages</span>
              <div className={styles.aboutMe__tags}>
                <span className={styles.aboutMe__tag}>TypeScript</span>
                <span className={styles.aboutMe__tag}>JavaScript</span>
                <span className={styles.aboutMe__tag}>HTML / CSS</span>
              </div>
            </div>
            <div className={styles.aboutMe__stackRow}>
              <span className={styles.aboutMe__stackCategory}>Frameworks</span>
              <div className={styles.aboutMe__tags}>
                <span className={styles.aboutMe__tag}>React</span>
                <span className={styles.aboutMe__tag}>Next.js</span>
                <span className={styles.aboutMe__tag}>Remix</span>
              </div>
            </div>
            <div className={styles.aboutMe__stackRow}>
              <span className={styles.aboutMe__stackCategory}>Tooling</span>
              <div className={styles.aboutMe__tags}>
                <span className={styles.aboutMe__tag}>Vite</span>
                <span className={styles.aboutMe__tag}>Playwright</span>
                <span className={styles.aboutMe__tag}>Sanity</span>
                <span className={styles.aboutMe__tag}>Turborepo</span>
              </div>
            </div>
            <div className={styles.aboutMe__stackRow}>
              <span className={styles.aboutMe__stackCategory}>
                Infrastructure
              </span>
              <div className={styles.aboutMe__tags}>
                <span className={styles.aboutMe__tag}>Vercel</span>
                <span className={styles.aboutMe__tag}>Cloudflare</span>
                <span className={styles.aboutMe__tag}>GitHub Actions</span>
              </div>
            </div>
          </div>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
