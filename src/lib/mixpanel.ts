import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
  });
}

export { mixpanel };

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (MIXPANEL_TOKEN) {
    mixpanel.track(eventName, properties);
  } else {
    console.log("Mixpanel Event:", eventName, properties);
  }
};

export const trackPageView = (
  pageName: string,
  properties?: Record<string, any>
) => {
  trackEvent("Page View", { page: pageName, ...properties });
};

export const identifyUser = (
  userId: string,
  properties?: Record<string, any>
) => {
  if (MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
    if (properties) {
      mixpanel.people.set(properties);
    }
  }
};

export const setUserProperties = (properties: Record<string, any>) => {
  if (MIXPANEL_TOKEN) {
    mixpanel.people.set(properties);
  }
};

export const trackLoginAttempt = (email: string) => {
  trackEvent("Login Attempt", { email });
};

export const trackLoginSuccess = (userId: string) => {
  trackEvent("Login Success", {
    user_id: userId,
  });
};

export const trackLoginError = (error: string) => {
  trackEvent("Login Error", { error });
};

export const trackRegistrationAttempt = (data: {
  electionId: string;
  positionId: string;
  sourceId: string;
  email: string;
}) => {
  trackEvent("Registration Attempt", {
    election_id: data.electionId,
    position_id: data.positionId,
    source_id: data.sourceId,
    email: data.email,
  });
};

export const trackRegistrationSuccess = (userId: string) => {
  trackEvent("Registration Success", { user_id: userId });
};

export const trackRegistrationError = (error: string) => {
  trackEvent("Registration Error", { error });
};

export const trackFormFieldInteraction = (
  fieldName: string,
  action: "focus" | "blur" | "change"
) => {
  trackEvent("Form Field Interaction", {
    field_name: fieldName,
    action,
  });
};

export const trackPasswordVisibilityToggle = (
  isVisible: boolean,
  formType: "login" | "registration"
) => {
  trackEvent("Password Visibility Toggle", {
    is_visible: isVisible,
    form_type: formType,
  });
};
