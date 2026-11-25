// Expertise areas and technology list — shared by the Home preview and the Expertise page.
// Logos are official product icons from Microsoft's Azure, Power Platform and Entra icon sets,
// plus the Model Context Protocol mark. Files live in public/logos/.
export const tech: [string, string][] = [
  ['Power Platform', 'power-platform'], ['Power Apps', 'power-apps'], ['Power Automate', 'power-automate'], ['Dataverse', 'dataverse'],
  ['Copilot Studio', 'copilot-studio'], ['Microsoft Foundry', 'foundry'], ['Azure', 'azure'], ['Microsoft Entra ID', 'entra-id'],
  ['Logic Apps', 'logic-apps'], ['Azure Functions', 'azure-functions'], ['Databricks', 'databricks'], ['MCP', 'mcp'],
];
export const areas = [
  {
    label: '01 / INTELLIGENCE', title: 'Agentic AI & Copilots', logo: 'foundry',
    summary: 'Designing grounded, governed agents that reason over enterprise data and act through secure, well-defined tools.',
    capabilities: [
      ['Microsoft Foundry & Azure AI agents', ['foundry']],
      ['Copilot Studio', ['copilot-studio']],
      ['AI agent orchestration', ['foundry-agent-service']],
      ['Model Context Protocol (MCP)', ['mcp']],
      ['Agent grounding & evaluation', ['foundry-iq']],
      ['Enterprise AI security & governance', ['foundry-control-plane']],
      ['Databricks Genie integrations', ['databricks']],
    ] as [string, string[]][],
  },
  {
    label: '02 / ENGINEERING', title: 'Power Platform', logo: 'power-platform',
    summary: 'Architecting maintainable business applications on a well-modelled Dataverse foundation, with ALM and governance built in from day one.',
    capabilities: [
      ['Power Apps', ['power-apps']],
      ['Power Automate', ['power-automate']],
      ['Dataverse', ['dataverse']],
      ['Power BI', ['power-bi']],
      ['Application lifecycle management (ALM)', ['azure-devops']],
      ['Power Platform governance', ['power-platform']],
    ] as [string, string[]][],
  },
  {
    label: '03 / ARCHITECTURE', title: 'Cloud & Integration', logo: 'azure',
    summary: 'Connecting apps, agents and data through secure, identity-first integration patterns on Azure.',
    capabilities: [
      ['Azure Logic Apps', ['logic-apps']],
      ['Azure Functions', ['azure-functions']],
      ['Secure API integrations', ['api-management']],
      ['Microsoft Entra ID authentication', ['entra-id']],
      ['Managed identities', ['managed-identities']],
      ['Azure SQL & Databricks', ['azure-sql', 'databricks']],
      ['Enterprise data integration', ['data-factory']],
    ] as [string, string[]][],
  },
];
