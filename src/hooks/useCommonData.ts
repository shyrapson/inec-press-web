import {
  getDesignation,
  getFederalUniversities,
  getMdas,
  getPreferredElectionState,
  getQualificationList,
  getStates,
  getStateUniversities,
} from "@/api/user";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useStore from "./useStore";
import { IUser } from "@/common/types";
import { isOrganizationDisable } from "@/lib/utils";

const useCommonData = () => {
  const { store } = useStore();
  const user_id = store?.auth?.currentUser?._id ?? "";
  const {
    data: stateList,
    isLoading: loadingState,
    refetch: refetchState,
  } = useQuery({
    queryFn: getStates,
    queryKey: [QUERY_KEYS.STATE_LIST],
  });
  const isOrganizationDisabledValue = isOrganizationDisable(store?.auth?.currentUser as IUser);
  const { data: preferredStateOfElectionList, isLoading: loadingPreferredStateOfElectionList } =
    useQuery({
      queryFn: getPreferredElectionState,
      queryKey: [QUERY_KEYS.PREFERRED_STATE_OF_ELECTION_LIST],
    });
  const { data: stateUniversityList, isLoading: loadingStateUniversityList } = useQuery({
    queryFn: getStateUniversities,
    queryKey: [QUERY_KEYS.UNIVERSITIES_STATE_LIST],
  });
  const { data: federalUniversityList, isLoading: loadingFederalUniversityList } = useQuery({
    queryFn: getFederalUniversities,
    queryKey: [QUERY_KEYS.UNIVERSITIES_FEDERAL_LIST],
  });
  const { data: mdaList, isLoading: loadingMdaList } = useQuery({
    queryFn: getMdas,
    queryKey: [QUERY_KEYS.MDA_LIST],
  });
  const { data: designationList, isLoading: loadingDesignationList } = useQuery({
    queryFn: () => getDesignation({ user_id }),
    queryKey: [QUERY_KEYS.DESIGNATION_LIST, user_id],
  });
  const { data: qualificationList, isLoading: loadingQualificationList } = useQuery({
    queryFn: getQualificationList,
    queryKey: [QUERY_KEYS.QUALIFICATION_LIST],
  });
  return {
    stateList,
    loadingState,
    stateUniversityList,
    loadingStateUniversityList,
    federalUniversityList,
    mdaList,
    loadingMdaList,
    designationList,
    loadingDesignationList,
    qualificationList,
    loadingQualificationList,
    preferredStateOfElectionList,
    loadingPreferredStateOfElectionList,
    isOrganizationDisabledValue,
    userDetails: store?.auth?.currentUser,
    refetchState,
  };
};

export default useCommonData;
