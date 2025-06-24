import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Box } from '@mui/material';
import { forwardRef, useCallback, useState } from 'react';
import ReactPlayer from 'react-player';
import FadeInAboutSection from './FadeInAboutSection';

interface VideoWrapperProps {
  children: React.ReactNode;
}

const VideoWrapper = forwardRef<HTMLDivElement, VideoWrapperProps>(
  ({ children }, ref) => (
    <Box
      sx={[
        {
          width: '100%',
          height: '100%',
          position: 'relative',
        },
      ]}
      ref={ref}
    >
      {children}
    </Box>
  )
);

VideoWrapper.displayName = 'VideoWrapper';

interface VideoLoaderProps {
  isPreview: boolean;
  onClick: () => void;
}

function VideoLoader({ isPreview, onClick }: VideoLoaderProps): JSX.Element {
  if (isPreview) {
    return (
      <VideoWrapper>
        <Box
          sx={[
            {
              cursor: 'pointer',
            },
            {
              '&:hover > img': {
                transform: 'scale(1.2)',
              },
            },
          ]}
          onClick={onClick}
        >
          <img
            src="/about/drift-in-news-screen-2.jpeg"
            alt="News of DrifterShoots climbing building screenshot"
            style={{
              width: '100%',
              transition: 'transform 0.2s ease-out',
            }}
          />
          <PlayCircleOutlineIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 30,
              fontSize: 50,
            }}
          />
        </Box>
      </VideoWrapper>
    );
  }

  return (
    <ReactPlayer
      url="/about/drift-in-news.mp4"
      style={{
        width: '100%',
      }}
      wrapper={VideoWrapper}
      controls
    />
  );
}

export default function Video(): JSX.Element {
  const [isPreview, setIsPreview] = useState(true);
  const onClickPreview = useCallback(() => {
    setIsPreview(false);
  }, []);

  return (
    <FadeInAboutSection
      sx={{
        display: 'flex',
        mb: {
          xs: 7,
          md: 14,
        },
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={[
          {
            flex: 8,
            height: {
              xs: '30rem',
              md: '75rem',
            },
            overflow: 'hidden',
          },
        ]}
      >
        <VideoLoader isPreview={isPreview} onClick={onClickPreview} />
      </Box>
    </FadeInAboutSection>
  );
}
