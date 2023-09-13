/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        //this serverActions:true means u can use the thing 'use server' in comps now 
        //'use server' is used to run a specific code to server only
        serverActions:true,
        //this serverComponentsExternalPackages is used to enable mongoose in next js
        //coz mongoose acts as a out of the box thing for a next js app
        // so to make our next js app familiar with mongoose use this
        //and add the package as mongoose ['mongoose] 
        serverComponentsExternalPackages:['mongoose'],
    },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.clerk.com',
            },
            {
                protocol:'https',
                hostname:'images.clerk.dev',
            },
            {
                protocol:'https',
                hostname:'uploadthing.com',
            },
            {
                protocol:'https',
                hostname:'placehold.co',
            },
        ]
    }
}

module.exports = nextConfig
