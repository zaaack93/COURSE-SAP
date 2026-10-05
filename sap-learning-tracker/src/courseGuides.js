// SAP lesson text and course outlines reviewed 2026-10-05.
// Summaries are paraphrases; practices/checks are original roadmap exercises.
const btp = 'https://learning.sap.com/courses/exploring-sap-business-technology-platform/'
const lesson = (title, slug, minutes, summary) => ({ title, url: btp + slug, minutes, summary })

export const btpUnits = [
  {
    title: 'SAP BTP Strategy: Overview',
    check: 'Explain where ERP ends and BTP adds value in a Shopify order integration.',
    lessons: [
      lesson('Positioning SAP Business Technology Platform', 'illustrating-the-intelligent-sustainable-enterprise_df1d2992-a95a-487a-9a06-7226bebbb11d', 14, 'SAP’s vision connects fragmented processes and data so people can set goals while governed AI assists execution. BTP supplies tools to build, extend, integrate, automate, and run business solutions. Its capabilities span application development, integration, and an AI/data foundation. Think of BTP as the platform around your business applications, not the ERP itself.'),
      lesson('Identifying Solution Areas of SAP and Business Processes', 'identifying-solution-areas-of-the-intelligent-sustainable-enterprise_c46fd60f-ece0-4d3e-9496-1a4b0ec355f9', 15, 'S/4HANA Cloud is the ERP core. Other solutions address different business needs: SuccessFactors for HR, Ariba for purchasing, and Concur for travel and expenses. Business processes cross these application boundaries, so understanding the business flow matters before choosing integration tools.'),
      lesson('Describing the Suite Qualities and Use Cases of SAP BTP', 'describing-technology-of-the-intelligent-sustainable-enterprise_b0fbf80e-2b65-4de1-8455-885c3298fa46', 8, 'BTP helps a landscape of separate business applications work together. Connect systems, extend business functions, and use data and AI to improve processes. Start with the business problem, then identify the platform capabilities needed to solve it.'),
      lesson('Discovering Cloud Terminology', 'discovering-cloud-terminology_caf029db-06d3-445a-aedb-20684defabe5', 14, 'Cloud resources are consumed on demand. IaaS provides infrastructure, PaaS provides an application platform, and SaaS provides ready-to-use software. Public, private, and hybrid describe deployment approaches; hyperscalers provide large-scale cloud infrastructure. These terms describe different choices, not interchangeable products.'),
    ],
  },
  {
    title: 'SAP BTP: Architecture and Services',
    check: 'Sketch a global account with development and production subaccounts. Explain an entitlement, a service instance, and a destination.',
    lessons: [
      lesson('Introducing SAP BTP Commercial Models', 'analyzing-sap-business-technology-platform-sap-btp-_ae0a22bc-793e-4210-a3ab-fb3dc26c848f', 14, 'Commercial models determine how platform consumption is purchased. Pay-As-You-Go charges for usage and supports starting small. Before choosing a service, check its plan and your account’s commercial arrangement rather than assuming that every available service is free.'),
      lesson('Illustrating the Architecture of SAP BTP', 'illustrating-the-architecture-of-sap-btp_dece8e77-4191-4452-8595-171fa1a4aae7', 20, 'The global account represents the SAP contract and manages members, entitlements, and quotas. Optional directories organize subaccounts. Subaccounts are the working environments where allocated resources are consumed. Understand this hierarchy before provisioning services or separating environments.'),
      lesson('Demonstrating SAP BTP Cockpit', 'demonstrating-the-sap-btp-cockpit_ee7eb2fe-266e-431b-b8c1-bf1dd34f777c', 10, 'The cockpit is the administration interface for BTP. Use it to navigate your accounts and manage platform resources. Always check which global account and subaccount you are viewing before changing configuration.'),
      lesson('Identifying the Services in SAP BTP', 'identifying-the-services-in-sap-btp_e7380661-2cbc-4339-9d3b-c954d5b9c8ed', 14, 'BTP capabilities are offered as services. Depending on the service, you create an instance or subscribe to an application. Plans define available options. SAP Discovery Center helps you investigate services, plans, and use cases before provisioning.'),
      lesson('Analyzing Connectivity in SAP BTP', 'analyzing-connectivity-in-sap-btp_e525e7d8-20a0-41f7-8b79-eec4aad834a8', 10, 'The Destination service holds target connection information. The Connectivity service provides access to on-premise resources through Cloud Connector. These components help an extension reach remote business systems without embedding connection configuration throughout application code.'),
    ],
  },
  {
    title: 'SAP BTP: Agent and Application Development',
    check: 'Explain which part of your product app is the UI, which is the service, and which process could be automated.',
    lessons: [
      lesson('Discovering Agent and Application Development', 'discovering-application-development-and-automation_cca5c842-a632-4dc0-9524-d8a71252aee0', 14, 'Development can adapt interfaces, extend applications through APIs, or create separate applications on BTP. Automation reduces repetitive business tasks. Professional developers and business process experts bring different skills to these solutions.'),
      lesson('Identifying Development Frameworks', 'analyzing-development-tools-and-frameworks_bf8e7397-ddfa-4580-999d-7175d8edf6d9', 10, 'SAP offers frameworks and tools across the application stack. SAPUI5 addresses web interfaces; other frameworks address services and business logic. Choose tools for their role in the solution and use the BTP Guidance Framework to orient architecture decisions.'),
      lesson('Analyzing SAP Build Capabilities', 'analyzing-low-code-no-code-with-sap-build_d37ecd7f-f50e-4926-8a45-a1de9b17b89c', 33, 'SAP Build combines visual and code-based development, automation, and digital workspaces. It supports extensions that use SAP business context and data while keeping the core upgrade-ready. Match the tool to the task and the people maintaining it.'),
    ],
  },
  {
    title: 'SAP BTP: Integration',
    check: 'Describe how a Shopify order reaches an SAP API, and identify what must be transformed along the way.',
    lessons: [
      lesson('Describing Application Programming Interfaces (APIs)', 'describing-apis_e2995d2c-4b4c-4c09-848f-48283c7dd6e3', 16, 'An API defines how software communicates and exchanges information. APIs let SAP and non-SAP applications participate in a shared process. Read the interface contract before designing your integration.'),
      lesson('Illustrating SAP Business Accelerator Hub', 'illustrating-the-sap-business-accelerator-hub_c913055d-dbfb-4b85-84c9-508eb7468236', 5, 'Business Accelerator Hub helps you discover API references, schemas, and supported sandbox calls. SAP’s sandbox data lets you explore an interface before connecting to a real business system. Sandbox access is separate from production access.'),
      lesson('Illustrating SAP Integration Suite', 'illustrating-the-sap-integration-suite_b1c98a93-d3ca-4121-88ef-36bd397fae52', 13, 'Integration Suite is an integration platform as a service for connecting cloud and on-premise applications and processes. It supplies tools and prebuilt content so teams can manage integrations as shared business infrastructure.'),
    ],
  },
  {
    title: 'SAP BTP: AI and Data Foundation',
    check: 'Suggest one useful AI feature for your product app and identify the business data it would need.',
    lessons: [
      lesson('Describing SAP Business AI', 'describing-artificial-intelligence-ai-_f6c2ab8d-2fa1-45db-9895-ac84b635ced5', 9, 'SAP’s AI capabilities can support business processes through reusable services and embedded features. Governance, privacy, and lifecycle management matter alongside model capability. Choose a concrete business problem before choosing an AI service.'),
      lesson('Discovering the AI & Data Foundation with SAP HANA Cloud', 'discovering-the-value-of-sap-hana-cloud-and-other-database-services_e5c2f489-0cd3-452b-baa8-a06e396c7cba', 19, 'Useful enterprise AI depends on trustworthy data with business context. HANA Cloud helps connect business data to intelligent applications and AI use cases. Fragmented or poorly understood data limits what an AI application can reliably do.'),
      lesson('Describing SAP AI Foundation', 'describing-sap-ai-business-services_b8b4d646-4469-41dc-b33d-6cb92053601c', 10, 'SAP Document AI turns information in documents, such as invoices and delivery notes, into structured data for business processing. Upstream applications handle document collection and send documents for analysis. Think about the whole process, including validation of extracted results.'),
    ],
  },
  {
    title: 'SAP BTP: Security Fundamentals',
    check: 'Explain authentication versus authorization. Why should a product viewer be unable to delete products?',
    lessons: [
      lesson('Analyzing User and Authorization Management on SAP BTP', 'analyzing-user-and-authorization-management-on-sap-btp_d4e915e7-6a41-4bea-a17b-157566045563', 17, 'Platform users administer and operate BTP; business users use the applications. Both need appropriate permissions. Secure APIs as well as screens, and distinguish a person’s identity from the actions they may perform.'),
      lesson('Analyzing SAP Cloud Identity Services', 'analyzing-sap-cloud-identity-services_b3e97772-7473-4634-9529-61a2e2d70338', 13, 'An identity provider handles sign-in separately from application logic. BTP can trust an identity provider from your organization. Centralizing identity avoids each application maintaining an independent login system.'),
      lesson('Illustrating SAP Authorization and Trust Management Service (XSUAA)', 'illustrating-sap-authorization-and-trust-management-service-xsuaa-_b9fde282-4cff-4dca-b146-7c8f8dde9955', 11, 'XSUAA supports authentication and authorization flows for Cloud Foundry applications using a trusted identity provider. It supports business-role-based access without acting as the store of user records. Understand the relationship between the application, its router, and its security service.'),
    ],
  },
]

// Each row corresponds to the existing five tasks in that week.
// Weeks 2–12 are task study guidance, not claims to summarize every course lesson.
const notes = {
  1: [
    ['BTP provides the technology to extend ERP, connect applications, and support data and AI scenarios. Start with the strategy unit’s four lessons below.', 'Explain S/4HANA versus BTP using your own shop as an example.'],
    ['Learn the account hierarchy, service plans, cockpit, and connectivity in Unit 2 below.', 'Draw a global account, two subaccounts, and one connected service.'],
    ['Study how development frameworks, SAP Build, and automation fit together in Unit 3. Also review the AI/data unit for the complete platform picture.', 'Assign a UI, backend, workflow, and database to your product application.'],
    ['Study both Integration and Security below. Connecting systems and controlling access are separate responsibilities.', 'Describe a request from the shop through an integration to SAP, including its identity checks.'],
    ['Use the six-unit course guide as the vocabulary for your architecture. This is a roadmap exercise, not an additional SAP lesson.', 'Draw Shopify → integration → SAP API → S/4HANA; label where a CAP extension and Fiori UI fit.'],
  ],
  2: [
    ['Study Account Structure: organize accounts and allocate resources.', 'Sketch separate development and production subaccounts.'],
    ['Study Runtime Environments: understand where applications execute.', 'Explain which environment would host your Node.js service.'],
    ['Study Identity and Access Management: manage users and permissions.', 'List separate viewer, developer, and administrator responsibilities.'],
    ['Study Setup and Configuration Tools, then Platform Connectivity.', 'Record a target system and the connection configuration it needs.'],
    ['Study Observability and Monitoring, then review usage management.', 'Write a checklist for investigating an unavailable application.'],
  ],
  3: [
    ['Start with Exploring the Cloud Foundry Runtime.', 'Map your local application to its cloud runtime.'],
    ['Continue with Developing Applications in Cloud Foundry.', 'List configuration your app needs outside its source code.'],
    ['Study Managing Deployments before deploying.', 'Deploy a small service and record how to verify it responds.'],
    ['Study Optimizing and Managing Applications.', 'Describe how you would recognize an overloaded service.'],
    ['Apply the runtime concepts to a familiar Node.js application.', 'Compare local startup, cloud startup, configuration, and logs.'],
  ],
  4: [
    ['CAP uses domain models and reusable runtime behavior to build services.', 'Draw the model, service, and persistence layers.'],
    ['Begin with the basic CAP features and project structure.', 'Create a small Product entity and explain each field.'],
    ['Use CDS models as the basis for persistence and service definitions.', 'Expose Products and inspect its OData metadata.'],
    ['Custom logic complements the runtime’s generic service behavior.', 'Trace one create request and identify your validation point.'],
    ['Connect service behavior to local persistence in your learning project.', 'Insert, read, and update sample products; record your results.'],
  ],
  5: [
    ['Study Adding Custom Business Logic.', 'Reject a negative product price and verify the error.'],
    ['Study Authorization and Trust Management.', 'Check that a viewer cannot edit a product.'],
    ['Study Consuming External Services.', 'Describe one upstream dependency and its failure response.'],
    ['Apply custom logic to your Product Management project.', 'Exercise create, read, update, and delete with valid and invalid data.'],
    ['Connect the security and external-service units in your notes.', 'Draw the caller, application, identity provider, and external API.'],
  ],
  6: [
    ['Study Deploying the Application.', 'Record deployed services and a working verification request.'],
    ['Study Integrating into SAP Build Work Zone.', 'Explain how a user discovers and opens your application.'],
    ['Use the full-stack material to connect the application layers.', 'Follow the maintained CAP mission and note completed steps.'],
    ['Compare the course extension with your product project.', 'Write three differences and explain their purpose.'],
    ['Turn the deployment work into reproducible documentation.', 'Have your README explain setup, configuration, deployment, and verification.'],
  ],
  7: [
    ['Fiori elements generates an interface from an OData service and annotations.', 'Select your Product service and generate its UI.'],
    ['Preview the generated application against your local CAP service.', 'Open the list and a record; check for failed requests.'],
    ['The page editor configures list fields, columns, and filters.', 'Add a category filter and useful product columns.'],
    ['Configure the object page to display details for one record.', 'Group product fields and inspect navigation from the list.'],
    ['Combine the list and detail screens into a usable product flow.', 'Find a product, open it, edit it, and confirm the change.'],
  ],
  8: [
    ['Clean Core covers extensions, processes, data, integrations, and operations.', 'Identify where your proposed extension touches ERP.'],
    ['Keep ERP current and maintain cloud-compliant extensions and integrations.', 'Explain how a customization might complicate an upgrade.'],
    ['Relate Clean Core to the organization’s ERP transformation.', 'Describe what belongs in the core versus your external application.'],
    ['Apply the course principles to your own architecture exercise.', 'Label Shopify, the integration layer, and S/4HANA with their responsibilities.'],
    ['A design needs operational decisions as well as a diagram.', 'Record interfaces, access requirements, failure paths, and support ownership.'],
  ],
  9: [
    ['The learning journey develops API and integration-flow skills.', 'Read its prerequisites and identify missing foundations.'],
    ['Use the overview course to organize Integration Suite capabilities.', 'Map each capability to one need in your order integration.'],
    ['Study the API Management unit.', 'Describe the purpose of a proxy in front of a backend.'],
    ['Study the Cloud Integration unit.', 'Sketch a sender, transformation, and receiver.'],
    ['Study the Event Mesh unit.', 'Explain a case where the sender should not wait for processing.'],
  ],
  10: [
    ['Apply API Management concepts to the project boundary.', 'List consumers, authentication requirements, and expected traffic.'],
    ['Turn the Cloud Integration concepts into a processing sequence.', 'Draw validation, field mapping, the receiver call, and failure branches.'],
    ['Use the Event Mesh material to evaluate asynchronous delivery.', 'Compare waiting for a response with processing an order later.'],
    ['Review how you would operate the integrations you design.', 'Choose the signals that show a delayed or failed order.'],
    ['Prepare a troubleshooting procedure for your proposed flow.', 'Walk through a malformed payload, unavailable receiver, and rejected request.'],
  ],
  11: [
    ['Project exercise: define the incoming order contract before implementing the receiver.', 'Document required fields, source verification, and duplicate handling.'],
    ['Project exercise: connect a processing flow to a documented SAP interface.', 'Specify the endpoint, identity, response, and error contract.'],
    ['Project exercise: make data mapping explicit and reviewable.', 'Create a table of source fields, target fields, and conversion rules.'],
    ['Project exercise: justify security and delivery choices.', 'Explain access control, retries, duplicate handling, and asynchronous boundaries.'],
    ['Project exercise: organize evidence that someone else can follow.', 'Include sample payloads, a diagram, setup instructions, and failure examples.'],
  ],
  12: [
    ['Portfolio exercise: demonstrate the complete CAP application.', 'Verify deployment and record a short product workflow demo.'],
    ['Portfolio exercise: finish the order integration demonstration.', 'Show a successful order and a recoverable failure.'],
    ['Interview exercise: explain the business flow and technical responsibilities.', 'Give a three-minute architecture walkthrough without reading notes.'],
    ['Revision exercise: return to the relevant SAP sources when a concept is unclear.', 'Answer why you chose each platform service and what could fail.'],
    ['Portfolio exercise: present evidence of what you built and learned.', 'Update your README and profile with working demos and precise contributions.'],
  ],
}

export const taskGuides = Object.fromEntries(Object.entries(notes).flatMap(([week, rows]) =>
  rows.map(([summary, practice], index) => [`w${week}-${index + 1}`, { summary, practice }]),
))

taskGuides['w1-1'].url = btpUnits[0].lessons[0].url
taskGuides['w1-2'].url = btpUnits[1].lessons[0].url
taskGuides['w1-3'].url = btpUnits[2].lessons[0].url
taskGuides['w1-4'].url = btpUnits[3].lessons[0].url
taskGuides['w6-3'].url = 'https://discovery-center.cloud.sap/missiondetail/4327/4608/'
for (const id of ['w9-2', 'w9-3', 'w9-4', 'w9-5']) {
  taskGuides[id].url = 'https://learning.sap.com/courses/sap-cloud-platform-integration-service-overview'
}
