export const governanceTools = [
    {
        name: "get-proposals",
        description: "Returns governance proposals on Osmosis",
        inputSchema: {
            type: "object",
            properties: {
                status: {
                    type: "string",
                    description: "Optional: proposal status filter"
                }
            },
            required: []
        }
    },
    {
        name: "get-proposal-details",
        description: "Returns detailed information about a specific governance proposal",
        inputSchema: {
            type: "object",
            properties: {
                proposalId: {
                    type: "string",
                    description: "The proposal ID"
                }
            },
            required: ["proposalId"]
        }
    },
    {
        name: "get-proposal-votes",
        description: "Returns votes for a specific governance proposal",
        inputSchema: {
            type: "object",
            properties: {
                proposalId: {
                    type: "string",
                    description: "The proposal ID"
                },
                limit: {
                    type: "string",
                    description: "Optional: maximum number of votes to return (default 10)"
                }
            },
            required: ["proposalId"]
        }
    },
    {
        name: "get-proposal-tally",
        description: "Returns the vote tally for a governance proposal",
        inputSchema: {
            type: "object",
            properties: {
                proposalId: {
                    type: "string",
                    description: "The proposal ID"
                }
            },
            required: ["proposalId"]
        }
    }
];
