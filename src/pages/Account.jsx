import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Card,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  ArchiveBoxIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { LocationOn } from "@mui/icons-material";
import Address from "../components/Addresses/Address";
import UpdateForm from "../components/AccountSettings/UpdateForm";

const Account = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const data = [
    {
      label: "Orders",
      value: "orders",
      icon: ArchiveBoxIcon,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
    },
    {
      label: "Addresses",
      value: "addresses",
      icon: LocationOn,
    },
  ];

  const fetchUser = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    await getDoc(docRef)
      .then((response) => {
        setUser(response.data());
      })
      .catch((error) => {
        console.log("Unable to fetch user:", error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Typography className="text-blue-900 text-center mt-6" variant="h3">
        My Account
      </Typography>
      <Tabs value="orders" className="mt-4 max-w-3xl mx-auto px-4">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value }) => {
            if (value === "settings") {
              return (
                <TabPanel key={value} value={value}>
                  <UpdateForm />
                </TabPanel>
              );
            } else if (value === "addresses") {
              return (
                <TabPanel
                  key={value}
                  value={value}
                  className="grid md:grid-cols-3 sm:grid-cols-2"
                >
                  {user.addresses !== undefined &&
                    user.addresses.map(
                      ({ address, city, state, country, zipCode }, index) => (
                        <Address
                          address={address}
                          city={city}
                          state={state}
                          country={country}
                          zipCode={zipCode}
                        />
                      )
                    )}
                  <Card
                    shadow={false}
                    className="border p-4 rounded-none border-gray-600 text-black w-full h-full flex my-auto mx-auto hover:text-gray-600 cursor-pointer"
                  >
                    <PlusIcon className="w-10 flex mx-auto my-auto" />
                    <Typography className="text-center">New Address</Typography>
                  </Card>
                </TabPanel>
              );
            }
          })}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default Account;
