import { Box, Container, keyframes, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useContext } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";
import { Instagram } from "@mui/icons-material";
import { entranceAnimationDuration } from "./constants";
import { LoadedContext } from "./LoadedContextProvider";
import DiscordIcon from "./DiscordIcon";
import { NavButton } from "./NavButton";

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

const sitemapLinks = [
  {
    text: "Publications",
    link: "/publications",
  },
  {
    text: "Gallery",
    link: "/gallery",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "Contact",
    link: "/contact",
  },
];

const rightNav = [
  {
    text: "",
    href: "https://www.instagram.com/driftershoots",
    icon: <Instagram sx={{ fontSize: 20 }} />,
  },
  {
    text: "",
    href: "https://twitter.com/driftershoots",
    icon: <TwitterIcon sx={{ fontSize: 20 }} />,
  },
  {
    text: "",
    href: "https://discord.com/invite/kr65XUgPYw",
    icon: <DiscordIcon />,
  },
];

export default function Footer() {
  const { animationDelay } = useContext(LoadedContext);
  const router = useRouter();
  const { pathname } = router;

  return (
    <Box
      sx={{
        animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${
          1 + animationDelay
        }s`,
        position: "relative",
        zIndex: 3,
        borderTop: "1px solid #23222B",
        mt: 14,
      }}
    >
      <Container
        sx={{
          maxWidth: "1440px",
          pt: 13,
          pb: 4,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: {
                xs: "flex-start",
                md: "center",
              },
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              flex: 1,
            }}
          >
            <Link
              href="/"
              sx={{
                mb: {
                  xs: 1,
                  md: 0,
                },
              }}
            >
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
            <Typography
              variant="body1"
              sx={{
                color: "#717083",
                fontSize: "1.75rem",
                mt: 8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              &copy;{new Date().getFullYear()} All rights reserved
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {sitemapLinks.map(({ text, link }) => (
                <Typography
                  variant="body"
                  sx={{
                    m: 0.5,
                    fontWeight: 700,
                    fontSize: "1.75rem",
                    lineHeight: "3rem",
                    mx: 3,
                    borderBottom:
                      pathname === link ? "1px solid white" : "none",
                  }}
                  key={text}
                >
                  <NextLink href={link}>{text}</NextLink>
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              alignItems: {
                xs: "center",
                md: "flex-end",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                alignItems: "center",
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
            <Typography
              variant="body1"
              sx={{
                color: "#717083",
                fontSize: "1.75rem",
                mt: {
                  xs: 1,
                  md: 8,
                },
              }}
            >
              <NextLink href="/privacy-policy">Privacy Policy</NextLink>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#717083",
                fontSize: "1.75rem",
                mt: 1,
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              &copy;2022 All rights reserved
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
