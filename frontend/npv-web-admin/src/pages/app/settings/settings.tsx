import React from "react";
import { PageTitle } from "../../../components";
import { NpvTabs } from "../../../components/tabs/npvTabs";
import { Tab } from "@mui/material";
import { ChangePassword, Profile } from "./components";

export const Settings = () => {
  const [settingsView, setSettingsView] = React.useState("Profile");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSettingsView(newValue);
  };
  return (
    <section>
      <PageTitle title="Settings" subtitle="Manage your account settings" />

      <div className="my-12">
        <div>
          <NpvTabs
            value={settingsView}
            handleChange={handleChange}
            label={"Settings"}>
            <Tab value={"Profile"} label="Profile" />
            <Tab value={"ChangePassword"} label="Change Password" />
          </NpvTabs>
        </div>

        <div className="mt-6">
          {settingsView === "Profile" && (
            <section>
              <Profile />
            </section>
          )}
          {settingsView === "ChangePassword" && (
            <section>
              <ChangePassword />
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
