import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box,
} from '@mui/material';
import { bool, func } from 'prop-types';
import {
  forwardRef, useCallback, useState,
} from 'react';
import ReactPlayer from 'react-player';
import { childrenProps } from '../utils/prop-types';
import FadeInAboutSection from './FadeInAboutSection';

const VideoWrapper = forwardRef(({ children }, ref) => (
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
));

VideoWrapper.propTypes = {
  children: childrenProps.isRequired,
};

function VideoLoader({ isPreview, onClick }) {
  if (isPreview) {
    return (
      <VideoWrapper isPreview={isPreview} onClick={onClick}>
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
          <PlayCircleOutlineIcon sx={{
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

VideoLoader.propTypes = {
  isPreview: bool.isRequired,
  onClick: func.isRequired,
};

export default function Video() {
  const [isPreview, setIsPreview] = useState(true);
  const onClickPreview = useCallback(() => {
    setIsPreview(false);
  }, []);

  return (
    <FadeInAboutSection
      sx={{
        display: 'flex',
        my: 14,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <Box
        sx={[
          {
            flex: 8,
            height: '75rem',
            overflow: 'hidden',
          },
        ]}
      >
        <VideoLoader isPreview={isPreview} onClick={onClickPreview} />
      </Box>

    </FadeInAboutSection>
  );
}
