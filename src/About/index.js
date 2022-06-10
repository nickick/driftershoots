import {
  Box, keyframes, Typography,
} from '@mui/material';
import Link from 'next/link';
import { bool, object } from 'prop-types';
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { LoadedContext } from '../LoadedContextProvider';
import OutlinedButton from '../OutlinedButton';
import { childrenProps } from '../utils/prop-types';
import ZoomLazyImage from './ZoomLazyImage';

const fadeFromBelow = keyframes`
  0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

const fadeFromRight = keyframes`
  0% {
    -webkit-transform: translateX(20px);
            transform: translateX(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
  }
`;

function FadeInAboutSection({
  children,
  fadeInOnload,
  animationStyle,
  sx,
}) {
  const { animationDelay } = useContext(LoadedContext);

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <Box
      ref={ref}
      sx={{
        animation: (fadeInOnload || inView) ? `${animationStyle} 1s both ${animationDelay}s` : 'none',
        transition: 'opacity 1s ease-out',
        opacity: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

FadeInAboutSection.propTypes = {
  children: childrenProps.isRequired,
  fadeInOnload: bool,
  animationStyle: object,
  sx: object,
};

FadeInAboutSection.defaultProps = {
  animationStyle: fadeFromBelow,
  fadeInOnload: false,
  sx: {},
};

export default function About() {
  return (
    <Box
      sx={{
        zIndex: 3,
        px: {
          xs: 3,
          md: 14,
        },
        mt: {
          xs: 4,
          md: 14,
        },
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            width: '100%',
          }}
        >
          <FadeInAboutSection
            fadeInOnload
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: 7,
              width: {
                xs: '100%',
                md: '50%',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '50%',
                justifyContent: 'center',
                pr: 3,
              }}
            >
              <ZoomLazyImage
                src="/about/1.jpeg"
                alt="Empire State Builiding in clouds"
                style={{
                  marginBottom: '3rem',
                }}
              />
              <ZoomLazyImage
                src="/about/3.jpeg"
                alt="Drifter Shoots looking over city"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '50%',
                justifyContent: 'center',
                pr: {
                  xs: 0,
                  md: 3,
                },
              }}
            >
              <ZoomLazyImage
                src="/about/2.jpeg"
                alt="Brooklyn Bridge at night"
              />
            </Box>

          </FadeInAboutSection>
          <FadeInAboutSection
            fadeInOnload
            animationStyle={fadeFromRight}
            sx={{
              flex: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: {
                xs: 0,
                md: 3,
              },
              mt: {
                xs: 1,
                md: 0,
              },
            }}
          >
            <Typography
              variant="overline"
            >
              About
            </Typography>
            <Typography
              variant="h2"
            >
              Isaac Wright is an honorably retired Army special operations veteran of six years
              who began shooting photography to cope with mental illness, specifically PTSD
              and depression. His work involves capturing the world from never before
              seen perspectives.
            </Typography>
          </FadeInAboutSection>
        </Box>
        <FadeInAboutSection
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            my: 14,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: 7,
              width: {
                xs: '100%',
                md: '50%',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                pr: {
                  xs: 0,
                  md: 9,
                },
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  width: {
                    xs: '100%',
                    md: '60%',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="quote"
                  sx={{
                    fontSize: '6rem',
                    lineHeight: '6rem',
                  }}
                >
                  “The only thing he stole, was scenery.”
                </Typography>

                <Typography
                  variant="body"
                  sx={{
                    fontSize: '3rem',
                    mb: 6,
                  }}
                >
                  <Link
                    href="https://www.cincinnati.com/story/news/2021/04/19/photographer-and-veteran-isaac-wright-arrested-again-kentucky/7288482002/"
                    target="_blank"
                  >
                    Read More &#x3e;
                  </Link>
                </Typography>
              </Box>

              <ZoomLazyImage
                src="/about/4.jpeg"
                alt="Drifter Shoots looking back while in NYC afternoon"
              />
            </Box>
          </Box>
          <Box
            sx={{
              flex: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: 3,
            }}
          >
            <Typography
              variant="overline"
            >
              December 17, 2020
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '3rem',
                mb: 2.5,
              }}
            >
              Isaac was arrested unarmed at gunpoint.
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '2.5rem',
                mb: 2.5,
              }}
            >
              outside flagstaff Arizona on nationwide warrant all for the
              alleged crimes of entering areas in Cincinnati unlawfully and
              taking pictures. Using a picture of Isaac holding a handgun while
              in the service and with his military training police perpetuated
              a narrative that Isaac was a PTSD ridden threat to society and
              arrested him with 15 officers and an attack helicopter.
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '2.5rem',
                mb: 12,
              }}
            >
              Isaac has no criminal record and served honorably in the Army.
              He was the incarcerated without bond for two months in Arizona
              awaiting extradition to Cincinnati. Using his seized footage,
              the lead detective on his case sought to get him charged anywhere
              possible including Kentucky, Louisiana and Ohio. He was charged
              with three counts of F2 Burglary &#40;one step below murder,
              an F1&#41; all for the alleged crime of trespassing to
              take photos in Cincinnati, OH. The lead detective and
              prosecution stated on the record in court that
              “Nothing was stolen and nobody was hurt.”
            </Typography>
            <Typography
              variant="overline"
            >
              APRIL 9, 2021
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '3rem',
                mb: 2.5,
              }}
            >
              Released on bond after more than 100 days in jail.
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '2.5rem',
                mb: 6,
              }}
            >
              When he was finally taken back to Ohio, he posted bond and then
              an emergency hearing was called, raising his bond to $400,000
              before he could be released.  After two months of fighting bond
              was finally lowered and Isaac was released.  Isaac is still
              fighting the egregious wrongful imprisonment and over-charging by
              the Cincinnati Police Department and the case is an ongoing battle.
              Police also seized his new phone and car only a week after he was
              released when he was traveling back from Louisiana on the Ohio
              Court&apos;s orders.  His case is now reaching national news as
              he seeks justice.  With mounting legal fees and court costs
              he needs your help.
            </Typography>
            <OutlinedButton
              text="Donate to Drifter's Campaign"
              href="https://www.gofundme.com/f/isaac-wrights-incarceration?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer"
            >
              <Typography
                variant="h4"

              >
                Donate to Drifter&apos;s Campaign
              </Typography>
            </OutlinedButton>
          </Box>
        </FadeInAboutSection>
        <FadeInAboutSection
          sx={{
            my: 14,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              pl: 3,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: '4rem',
                  md: '6rem',
                },
                flex: 7,
              }}
            >
              To the moon, &amp; never back.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 3,
              }}
            >
              <Box
                sx={{
                  width: '3rem',
                  borderTop: '1px solid gray',
                  mb: 2,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontSize: '2.5rem',
                  textTransform: 'uppercase',
                  mb: 2,
                }}
              >
                News
              </Typography>
              <Typography
                variant="body"
                sx={[
                  {
                    fontSize: '2.5rem',
                  },
                  {
                    '& > a': {
                      textDecoration: 'underline',
                    },
                  },
                ]}
              >
                Isaac has been featured in
                {' '}
                <Link href="/publications">many news articles</Link>
                {' '}
                about his daring photography.
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 2,
              }}
            />
          </Box>
        </FadeInAboutSection>
      </Box>
    </Box>
  );
}
