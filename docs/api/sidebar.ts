import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/yapay-api",
    },
    {
      type: "category",
      label: "Payments",
      link: {
        type: "doc",
        id: "api/payments",
      },
      items: [
        {
          type: "doc",
          id: "api/create-payment",
          label: "Create a Payment Intent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-payments",
          label: "List Payment Intents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-payment",
          label: "Retrieve a Payment Intent",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/confirm-payment",
          label: "Confirm a Payment Intent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/cancel-payment",
          label: "Cancel a Payment Intent",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Checkout",
      link: {
        type: "doc",
        id: "api/checkout",
      },
      items: [
        {
          type: "doc",
          id: "api/create-checkout-session",
          label: "Create a Checkout Session",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-checkout-session",
          label: "Retrieve a Checkout Session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/expire-checkout-session",
          label: "Expire a Checkout Session",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      link: {
        type: "doc",
        id: "api/webhooks",
      },
      items: [
        {
          type: "doc",
          id: "api/create-webhook-endpoint",
          label: "Create a Webhook Endpoint",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
