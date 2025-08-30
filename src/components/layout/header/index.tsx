import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../../../contexts/color-mode";
import type { Users } from '@/graphql/schema.types';
import { LogoutOutlined, SettingsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<Users>();
  const [IsOpen, SetIsOpen] = useState(false)

    const { mutate: logout } = useLogout(); // ⬅️ use this

  // --- Popover state ---
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(user?.name) && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.name && (
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline-block",
                      },
                    }}
                    variant="subtitle2"
                  >
                    {user?.name}
                  </Typography>
                )}

                <Avatar

                  alt={user?.name}
                  onClick={handleAvatarClick}
                  sx={{ cursor: "pointer" }} // Make it look clickable
                />

                {/* Popover attached to Avatar */}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    {user?.name}
                  </Typography>
                  <div>
                    <Button
                      onClick={() => SetIsOpen(true)}
                      startIcon={<SettingsOutlined />}
                      fullWidth
                      style={{ justifyContent: 'flex-start' }} // aligns text and icon left
                    >
                      Ρυθμισεις
                    </Button>
                   <Button
            onClick={() => {
              // optional: close the popover first
              setAnchorEl(null);
              logout(); // ⬅️ triggers authProvider.logout and redirects
            }}
            startIcon={<LogoutOutlined />}
            fullWidth
            style={{ justifyContent: "flex-start" }}
          >
            Αποσύνδεση
          </Button>

                  </div>
                </Popover>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
