import axios from "@/api/axios";
import { Referral } from "@/types/referral";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import useLoading from "@/hooks/useLoading";

const ReferredStudents = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [refresher, setRefresher] = useState(0);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .get<Referral[]>("/referrals", config)
      .then((response) => {
        setReferrals(response.data.filter((referrals) => !referrals.isAccepted));
        //setReferrals(response.data);
        console.log(referrals);
      })
      .catch((error) => {
        console.error("Error retrieving referrals:", error);
      });
  }, [refresher]);

  const handleAcceptConfirmation = (id: number) => {
    setLoading(true);
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .put(`/referrals/${id}`, { isAccepted: true }, config)
      .then((response) => {
        console.log(response);
        setRefresher(refresher + 1);
      })
      .catch((error) => {
        console.error("Error accepting referral:", error);
      });
    setLoading(false);
  };

  return (
    <>
      <div className=" overflow-y-auto">
        {referrals.length === 0 ? (
          <p className=" text-gray-500 text-sm p-2">No referrals yet.</p>
        ) : (
          <ul className=" p-2">
            {referrals.map((referral) => (
              <li
                key={referral.id} // You should use a unique key for each list item
                className="border-b px-2 rounded-md shadow-sm py-2 border mb-2"
              >
                <div className="flex flex-col">
                  <div className=" flex gap-2">
                    {
                      <div className="text-gray-500 text-sm">
                        Student ID: <span className="text-primary text-black">{referral.studentID}</span>
                      </div>
                    }
                  </div>
                  <div className="text-gray-500 text-sm">
                    Referred by:{" "}
                    <span className="text-primary">
                      {referral.teacher.firstName} {referral.teacher.lastName}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm mb-1">
                    Reason:{" "}
                    <div className=" bg-gray-300 border rounded p-2">
                      <i className="text-black flex flex-grow w-full break-all">{referral.reason}</i>
                    </div>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"sm"} className=" rounded-lg">
                      Accept
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmation</AlertDialogTitle>
                      <AlertDialogDescription>Are you sure you want to accept this referral?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleAcceptConfirmation(referral.id)} disabled={loading}>
                        Accept
                      </AlertDialogAction>{" "}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ReferredStudents;
