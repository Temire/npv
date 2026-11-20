import * as React from "react";
import {
  EmptyState,
  NpvButton,
  NpvDialog,
  NpvInput,
  NpvSelect,
  SubscriptionCard
} from "../../../components";
import { FaPlus } from "react-icons/fa6";
// import { Pagination } from "@mui/material";
import { Formik } from "formik";
import { subscriptionCycles, subscriptionTypes } from "../../../config";
import { SubscriptionPlan } from "../../../types";
import {
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  getAllSubscriptionPlans,
  updateSubscriptionPlan
} from "../../../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Modal, Box, Button } from "@mui/material";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Plan name is required"),
  description: Yup.string().required("Plan description is required"),
  amount: Yup.number()
    .required("Plan amount is required")
    // .min(500, "Amount must be at least 500")
    .typeError("Amount must be a number"),
  subscriptionCycle: Yup.string().required("Subscription cycle is required"),
  subscriptionType: Yup.string().required("Subscription type is required")
});

export const Subscriptions: React.FC = () => {
  const [pageSize] = React.useState(100);
  const [pageNumber] = React.useState(1);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<any>(null);
  const [openEditModal, setOpenEditModal] = React.useState<any>(null);

  const [initialValues] = React.useState<SubscriptionPlan>({
    name: "",
    description: "",
    amount: 0,
    subscriptionCycle: null,
    subscriptionType: null
  });

  const {
    data: sub_plans,
    isLoading: plans_isLoading,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: ["allPlans"],
    queryFn: () =>
      getAllSubscriptionPlans({ pageSize, pageNumber: pageNumber - 1 })
  });

  const onCreatePlan = useMutation({
    mutationKey: ["createSubPlan"],
    mutationFn: createSubscriptionPlan,
    onSuccess(data) {
      console.log(data);
      toast.success("Subscription plan created.");
      setOpenModal(false);
      refetch();
      setTimeout(() => {
        refetch();
      }, 2000);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.data?.responseMessage);
    }
  });

  const onUpdatePlan = useMutation({
    mutationKey: ["updateSubPlan"],
    mutationFn: updateSubscriptionPlan,
    onSuccess(data) {
      console.log(data);
      toast.success("Subscription plan updated successfully.");
      setOpenEditModal(null);
      refetch();
      setTimeout(() => {
        refetch();
      }, 2000);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.data?.responseMessage);
    }
  });

  const onDeletePlan = useMutation({
    mutationKey: ["deleteSubPlan"],
    mutationFn: deleteSubscriptionPlan,
    onSuccess(data) {
      console.log(data);
      toast.success("Subscription plan deleted successfully.");
      setOpenDeleteModal(null);
      refetch();
      setTimeout(() => {
        refetch();
      }, 2000);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.data?.responseMessage);
    }
  });

  const handleCreatePlan = (values: SubscriptionPlan) => {
    onCreatePlan.mutate(values);
    console.log(values);
  };

  const handleUpdatePlan = (values: SubscriptionPlan) => {
    onUpdatePlan.mutate({ ...values, planId: openEditModal?.id });
    console.log(values);
  };

  const handleDeletePlan = () => {
    onDeletePlan.mutate({ planId: openDeleteModal?.id });
  };

  // const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
  //   setPageNumber(value - 1);
  // };

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log(sub_plans);
  const subPlans = sub_plans && sub_plans?.length > 0 ? sub_plans : [];

  return (
    <section>
      <div className="flex flex-wrap justify-between gap-6 items-center mb-6 lg:mb-10">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-[30px]">Subscription plans</p>
        </div>
        <NpvButton click={() => setOpenModal(true)}>
          <FaPlus /> Add plan
        </NpvButton>
      </div>

      <>
        {plans_isLoading && (
          <>
            <div className="grid grid-cols-1 smm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 lg:gap-8">
              {[...Array(12)].map(() => (
                <div className="w-full min-w-80 rounded-lg overflow-hidden shadow-lg animate-pulse">
                  <div className="p-6 bg-gradient-to-r from-gray-200 to-gray-300">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {isSuccess && !plans_isLoading && subPlans?.length <= 0 ? (
          <EmptyState
            text={"You have not added any plan yet."}
            btnText={
              <>
                <div>
                  <FaPlus />
                </div>
                Add plan
              </>
            }
            btnFn={() => setOpenModal(!openModal)}
          />
        ) : (
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 lg:gap-8">
              {subPlans?.map((plan: SubscriptionPlan, idx: number) => (
                <div className="w-full" key={idx}>
                  <SubscriptionCard
                    key={idx}
                    plan={plan}
                    setOpenDeleteModal={setOpenDeleteModal}
                    setOpenEditModal={setOpenEditModal}
                  />
                </div>
              ))}
            </div>
            {/* <div className="mt-20 w-full">
              <Pagination
                count={sub_plans?.totalPages}
                page={pageNumber + 1}
                onChange={handleChange}
                color="primary"
              />
            </div> */}
          </div>
        )}
      </>

      {/* Create */}
      <NpvDialog
        size="sm"
        showCloseIcon={false}
        title={`Add subscription plan`}
        dialogProps={{
          open: openModal,
          onClose: handleClose
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values: SubscriptionPlan) => {
            handleCreatePlan(values);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values: {
              name,
              description,
              amount,
              subscriptionCycle,
              subscriptionType
            }
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="flex flex-col justify-center items-center text-center gap-6 my-10">
                    <NpvInput
                      fullWidth
                      label="Name"
                      type="text"
                      name="name"
                      placeholder="Enter plan name"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <NpvInput
                      fullWidth
                      label="Plan description"
                      type="text"
                      name="description"
                      placeholder="Enter plan description"
                      value={description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <NpvInput
                      fullWidth
                      label="Amount"
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <NpvSelect
                      label="Subscription cycle"
                      type="text"
                      name="subscriptionCycle"
                      placeholder="Select subscription cycle"
                      value={subscriptionCycle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      useValue
                      hasObjects
                      selectableObjects={subscriptionCycles}
                    />

                    <NpvSelect
                      label="Subscription type"
                      type="text"
                      name="subscriptionType"
                      placeholder="Select subscription type"
                      value={subscriptionType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      useValue
                      hasObjects
                      selectableObjects={subscriptionTypes}
                    />
                  </div>
                </div>
                <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
                  <NpvButton
                    extraClass="!px-8"
                    variant="SecondaryOutline"
                    click={handleClose}>
                    Cancel
                  </NpvButton>
                  <NpvButton
                    extraClass="!px-8"
                    type="submit"
                    isDisabled={onCreatePlan.isPending}
                    loading={onCreatePlan.isPending}>
                    Create
                  </NpvButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </NpvDialog>

      {/* Edit */}
      {openEditModal && (
        <NpvDialog
          size="sm"
          showCloseIcon={false}
          title={`Update subscription plan - ${openEditModal?.name}`}
          dialogProps={{
            open: !!openEditModal,
            onClose: () => setOpenEditModal(null)
          }}>
          <Formik
            initialValues={openEditModal}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values: SubscriptionPlan) => {
              handleUpdatePlan(values);
            }}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values: {
                name,
                description,
                amount,
                subscriptionCycle,
                subscriptionType
              }
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="flex flex-col justify-center items-center text-center gap-6 my-10">
                      <NpvInput
                        fullWidth
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Enter plan name"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <NpvInput
                        fullWidth
                        label="Plan description"
                        type="text"
                        name="description"
                        placeholder="Enter plan description"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <NpvInput
                        fullWidth
                        label="Amount"
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <NpvSelect
                        label="Subscription cycle"
                        type="text"
                        name="subscriptionCycle"
                        placeholder="Select subscription cycle"
                        value={subscriptionCycle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        useValue
                        hasObjects
                        selectableObjects={subscriptionCycles}
                      />

                      <NpvSelect
                        label="Subscription type"
                        type="text"
                        name="subscriptionType"
                        placeholder="Select subscription type"
                        value={subscriptionType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        useValue
                        hasObjects
                        selectableObjects={subscriptionTypes}
                      />
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
                    <NpvButton
                      extraClass="!px-8"
                      variant="SecondaryOutline"
                      click={() => setOpenEditModal(null)}>
                      Cancel
                    </NpvButton>
                    <NpvButton
                      extraClass="!px-8"
                      type="submit"
                      isDisabled={onUpdatePlan.isPending}
                      loading={onUpdatePlan.isPending}>
                      Save
                    </NpvButton>
                  </div>
                </form>
              );
            }}
          </Formik>
        </NpvDialog>
      )}

      {/* Delete */}
      <Modal
        open={!!openDeleteModal}
        onClose={() => setOpenDeleteModal(null)}
        aria-labelledby="delete-confirmation-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: "none"
          }}>
          <div className="flex flex-col justify-center items-center gap-6">
            <ExclamationCircleIcon className="w-16 lg:w-20 h-16 lg:h-20 text-red-600" />
            <p className="font-bold text-[20px] lg:text-[24px]">
              Confirm Deletion
            </p>
            <p className="font-medium text-gray-500 text-center">
              Are you sure you want to delete the{" "}
              <strong>{openDeleteModal?.name}</strong> plan? This action cannot
              be undone.
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-10">
            <Button
              onClick={() => setOpenDeleteModal(null)}
              variant="outlined"
              className="!flex-1 !normal-case !font-semibold !rounded-lg !text-base">
              Cancel
            </Button>
            <NpvButton
              extraClass="!bg-red-600 !border-red-600 !flex-1 !normal-case !shadow-none !font-semibold !rounded-lg !text-base"
              click={handleDeletePlan}
              loading={onDeletePlan.isPending}
              isDisabled={onDeletePlan.isPending}>
              Delete
            </NpvButton>
          </div>
        </Box>
      </Modal>
    </section>
  );
};
