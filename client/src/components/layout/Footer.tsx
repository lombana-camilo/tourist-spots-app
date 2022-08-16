import { Link, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export const Footer = () => {
  const githubLink =
    "https://github.com/lombana-camilo/tourist-spots-app";
  const linkedInLink =
    "www.linkedin.com/in/camilo-lombana-970812196";
  const emailLink = "mailto:lombana.camilo@hotmail.com";
  return (
    <footer
      style={{
        backgroundColor: "#323336",
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Stack direction="row" justifyContent="space-around">
        <Typography sx={{fontStyle:"italic", color:"#788BC5"}}> Copyright &copy; 2022 Camilo Lombana </Typography>
        <Stack direction="row" spacing={2}>
          <Link href={githubLink} target={"_blank"}>
            <GitHubIcon color="inherit" />
          </Link>
          <Link href={linkedInLink} target={"_blank"}>
            <LinkedInIcon color="inherit" />
          </Link>
          <Link href={emailLink} target={"_blank"}>
            <EmailIcon color="inherit" />
          </Link>
        </Stack>
      </Stack>
    </footer>
  );
};
