import { ArrowDropDown, Instagram } from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Container,
  keyframes,
  Menu,
  MenuItem,
} from "@mui/material";
import { Spin as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { entranceAnimationDelay, entranceAnimationDuration } from "./constants";
import DiscordIcon from "./DiscordIcon";
import Drawer from "./Drawer";
import { NavButton } from "./NavButton";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const initialHeight = 35;

const fadeInLogo = keyframes`
  0% {
    -webkit-transform: scale(1.2) translateY(${initialHeight}vh);;
    transform: scale(1.2) translateY(${initialHeight}vh);
    letter-spacing: 0.5em;
    opacity: 0;
  }

  70% {
    -webkit-transform: scale(1.2) translateY(${initialHeight}vh);
    transform: scale(1.2) translateY(${initialHeight}vh);
    letter-spacing: 0em;
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
`;

const leftNav = [
  {
    text: "Prints",
    href: "/prints",
    icon: "",
  },
  {
    text: "Gallery",
    href: "/gallery",
    icon: "",
  },
  {
    text: "Publications",
    href: "/publications",
    icon: "",
  },
];

const appMenu = [
  {
    text: "WMVG Migration",
    href: "https://wheremyvansgo.com",
    icon: "",
  },
  {
    text: "First Day Out",
    href: "https://firstdayout.driftershoots.com",
    icon: "",
  },
  {
    text: "Drift Vault",
    href: "https://vault.driftershoots.com",
    icon: "",
  },
];

const rightNav = [
  {
    text: "",
    href: "https://discord.com/invite/kr65XUgPYw",
    icon: <DiscordIcon />,
  },
  {
    text: "",
    href: "https://twitter.com/driftershoots",
    icon: <TwitterIcon sx={{ fontSize: 20 }} />,
  },
  {
    text: "",
    href: "https://www.instagram.com/driftershoots",
    icon: <Instagram sx={{ fontSize: 20 }} />,
  },
  {
    text: "Contact",
    href: "/contact",
    icon: "",
  },
  {
    text: "About",
    href: "/about",
    icon: "",
  },
];

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box
      sx={{
        pt: {
          xs: "4rem",
          md: "6.5rem",
        },
        pb: {
          xs: 2,
        },
        px: "4rem",
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        zIndex: {
          xs: 100,
          md: 2,
        },
        position: {
          xs: "sticky",
          md: "relative",
        },
        top: "0px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1440px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: {
              xs: "flex",
              md: "none",
              animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
            },
          }}
        >
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            direction="left"
            size={20}
          />
          <Drawer isOpen={isOpen} setOpen={setOpen} closeDrawer={closeDrawer} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          {leftNav.map(({ text, href, icon }, index) => (
            <NavButton
              key={text + href}
              text={text}
              href={href}
              icon={icon}
              index={index}
            />
          ))}
          <Button
            variant="text"
            sx={{
              color: "text.primary",
              mx: "0.5rem",
              fontSize: "1.5rem",
              lineHeight: "2rem",
              letterSpacing: "0.1rem",
              animation: `${fadeIn} ${entranceAnimationDuration}s both ${
                entranceAnimationDelay + (leftNav.length + 1) * 0.2
              }s`,
            }}
            onClick={handleClick}
          >
            Apps
            <ArrowDropDown
              sx={{
                fontSize: "3rem",
              }}
            />
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {appMenu.map(({ text, href, icon }, index) => (
              <MenuItem onClick={handleClose} key={text + href}>
                <NavButton
                  text={text}
                  href={href}
                  icon={icon}
                  index={index}
                  animation={false}
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            animation: `${fadeInLogo} ${entranceAnimationDuration}s both`,
            zIndex: 15,
          }}
        >
          <Link href="/">
            <img
              src="/icons/drift-logo.svg"
              style={{
                height: "24px",
                aspectRatio: "116 / 38",
                cursor: "pointer",
              }}
              alt="Drifter Shoots logo"
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            flexDirection: "row-reverse",
            flex: 1,
            flexWrap: "nowrap",
            justifyContent: "flex-start",
          }}
        >
          <NavButton
            key="twitter-mobile"
            href={rightNav[1].href}
            icon={rightNav[1].icon}
            index={0}
          />
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            flexDirection: "row-reverse",
            flex: 1,
            flexWrap: "nowrap",
            justifyContent: "flex-start",
          }}
        >
          {rightNav.map(({ text, href, icon }, index) => (
            <NavButton
              key={text + href}
              text={text}
              href={href}
              icon={icon}
              index={index}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
