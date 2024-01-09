import express from 'express';
import { google } from 'googleapis';

const router = express.Router();

const credentials = {
    client_email: '',//YPUR SERVICE ACCOUNT
    private_key: "",//YOUR PRIVATE KEY
};
// Create an OAuth2 client with the service account credentials
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const analytics = google.analyticsreporting({
    version: 'v4',
    auth,
});

router.get('/analytics', async (req, res) => {
    try {
        const response = await analytics.reports.batchGet({
            requestBody: {
                reportRequests: [
                    {
                        viewId: '', //YOUR VIEW ID
                        dateRanges: [
                            {
                                startDate: '2023-01-01',
                                endDate: '2023-12-31',
                            },
                        ],
                        metrics: [
                            { expression: 'ga:sessions' },
                            { expression: 'ga:pageviews' },
                            { expression: 'ga:avgSessionDuration' },
                        ],
                    },
                ],
            },
        });

        const data = response.data.reports[0].data;
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
