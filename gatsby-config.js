module.exports = {
    // Autoload the site metadata.
    siteMetadata: {
        title: 'Scott Milliorn - .NET & Web Full-Stack Developer',
        description:
            'Designing & building web and desktop apps with .NET along with websites in ReactJS.',
        author: 'Scott Milliorn',
        image: 'src/img/logo.jpg',
        siteUrl: `https://scottmilliorn.netlify.app/`,
        social: {
            twitter: '@scottmilliorn',
        },
    },

    // Gatsby plugins
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/img`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Scott Milliorn Portfolio',
                short_name: 'Scott Milliorn',
                start_url: '/',
                background_color: '#FFFFFF',
                theme_color: '#FFFFFF',
                display: 'minimal-ui',
                icon: `src/img/logo.jpg`, // This path is relative to the root of the site.
                icons: [
                    {
                        src: `/favicons/android-chrome-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ], // Add or remove icon sizes as desired
                icon_options: {
                    purpose: `any maskable`,
                },
            },
        },
        /*{
            resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
            options: {
                //openAnalyzer: true,
                analyzerMode: 'server',
                //analyzerPort: '8888',
                devMode: true
                //disable: true
                //analyzerHost: 'http://myhost.com',
                //defaultSizes: 'gzip'
            }
        },*/
        `gatsby-plugin-offline`,
        /*{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-138977349-1',
				head: false
			}
		},*/
        `gatsby-plugin-preact`,
        `gatsby-plugin-minify`,
    ],
};
