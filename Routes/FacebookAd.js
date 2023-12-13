import {
  FacebookAdsApi,
  AdAccount,
  Campaign,
  Ad,
} from "facebook-nodejs-business-sdk";
import express from "express";

const router = express.Router();

const accessToken =
  "....."; // replace with access token
const api = FacebookAdsApi.init(accessToken);

const adAccount = AdAccount;
const account = new adAccount("act_00000000000");//replace with account id

router.post("/create-campaign", async (req, res) => {
  try {
    const { name, status, objective, ad_category } = req.body;
    const createdCampaign = await account.createCampaign([], {
      [Campaign.Fields.name]: name,
      [Campaign.Fields.status]: status,
      [Campaign.Fields.objective]: objective,
      [Campaign.Fields.special_ad_categories]: [ad_category],
    });

    res.json({ success: true, campaign: createdCampaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/get-ads", async (req, res) => {
  try {

    const campaigns = await account.getCampaigns({
      fields: [Campaign.Fields.name, Campaign.Fields.configured_status],
    });

    if (campaigns.length > 0) {
      const formattedCampaigns = campaigns.map((campaign) => ({
        id: campaign.id,
        name: campaign.name,
        configured_status: campaign.configured_status,
      }));

      res.json({ success: true, campaigns: formattedCampaigns });
    } else {
      res.json({ success: false, error: "No campaigns found" });
    }
  } catch (error) {
    console.error("Error retrieving ads:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/update-campaign/:campaignId', async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    const { name, status, objective, category } = req.body;
    const campaign = new Campaign(campaignId);

    campaign.name = name;
    campaign.status = status;
    campaign.special_ad_categories = category;
    campaign.objective = objective;
    await campaign.update();

    res.json({ success: true, campaign });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/delete-campaign/:campaignId', async (req, res) => {
  try {
    const campaignId = req.params.campaignId;

    const campaign = new Campaign(campaignId);
    await account.delete(campaign);

    res.json({ success: true, message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
