---
source_url: https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos
loaded_url: https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos
title: ""
fetched_at: 
apify_run_id: BrDSV6rfarU6FOjBB
apify_dataset_id: igZjRvGRrtnhDuTVs
sha256: 24e90eba6c9be47e696276e13392b9a65abc0f1f3f72fc5f7d41b5b39ea0d3c3
quality: ok
---

# Shopify Help Center | Adding store policies

You can manage the following policies for your Shopify store:

*   Return policy
*   Privacy policy
*   Terms of service
*   Shipping policy
*   Legal notice
*   Contact information
*   Subscription policy

For supported policies, you can use [automated store policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos#automated-store-policies) to keep policy content up to date with your store settings, or [write and maintain your own policy](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos#add-or-generate-store-policies).

Automated store policies use information from your store settings to generate and publish policy content, and keep that content updated when relevant settings change.

You can manage automation separately for your return and refund policy, terms of service, shipping policy, and contact information.

You might need to update the automated templates or add specific disclosures if you:

*   Offer auto-renewing subscriptions.
*   Sell regulated products, such as alcohol.
*   Sell products that are subject to market-specific rules, such as safety, labeling, cosmetics, electronics, children's products, or food-contact materials.
*   Operate a child-directed site.

Consult a lawyer if you need help determining which requirements apply to your business.

Automated store policies might not reflect the most recent legal developments, and their information isn't guaranteed to be correct or complete. Using, accessing or publishing these materials doesn't create an attorney-client relationship between you and Shopify. Shopify isn't liable for your use or publication of these materials, or for any action that you take or don't take based on them.

### Manage automation for each policy

You can manage automation for each supported policy in **Settings** > **Policies** using **Use automated policy**.

Don't assume that an automatically published policy includes every detail your business needs. Review your policies as you set up your store and whenever your business practices change.

### Review your automated policies

Check the following for each automated policy:

*   Make sure that the content reflects your business practices.
*   If you use an app to manage returns, then review your automated return and refund policy to make sure that it matches the return rules and customer instructions you use with the app.
*   Don't promise delivery or shipping times that you can't provide.
*   Check that the public contact information is accurate and suitable for customers.

If you aren't comfortable sharing your personal contact details in your policies, then consider the following options:

*   **Mailing address**: Rent a post office (PO) box from your local post office or a mailbox from a provider such as The UPS Store to use as your business mailing address. Check the address requirements for your business and each policy before making changes. Some legal disclosures require a physical business address and don't accept PO boxes.
*   **Phone number:** Use a dedicated business phone number or a call-forwarding service that gives customers a separate number to call, so that you don't need to publish your personal phone number.

### Activate an automated policy

This feature helps simplify your store's compliance with consumer protection laws and manage your online agreements and policies with customers by automatically adjusting to certain changes in your store settings. To turn off automation for a policy, refer to [Turn off automation and customize a policy](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos#customize-automated-policies).

On existing stores, you can activate automation, which replaces that policy's content with Shopify's automated template. It also replaces custom translations in languages that have an automated template. Save a copy of any custom wording and translations that you want to keep before you activate automation. Review the replacement content rather than assuming that your previous edits will be preserved. Review each translated policy to make sure that it accurately reflects your policies. For critical interpretations or legal matters, consult a professional translator. Shopify does not accept any liability for errors or omissions in any translation.

#### Steps:

1.  From your Shopify admin, go to **Settings** > [**Policies**](https://admin.shopify.com/settings/legal).
    
2.  In the **Written policies** section, click the policy that you want to automate.
    
3.  Turn on **Use automated policy**.
    
4.  Review the generated policy.
    
5.  Click **Save**.
    

Repeat these steps for each policy that you want to automate. Activating one policy doesn't activate automation for every policy.

### Keep policy information up to date

When automation is on, the policy content stays in sync with the relevant store settings and Shopify's templates.

Where a detail in the policy has an action to edit its source, use that action to open the relevant setting. For example, a source action might take you to your store contact details or return rules. After changing a setting, review the policy again to check the information that customers can read.

Review every policy when you change how your business operates. Automation doesn't replace your responsibility to identify missing information, describe practices that aren't covered by the template, or notify customers of changes when required.

### Turn off automation and customize a policy

You can turn off automation for an individual policy to edit its text yourself. Turning off automation keeps the current policy content; it doesn't delete the policy. The policy keeps the information currently displayed, but no longer updates automatically when you change your store settings. Review and maintain the text yourself after turning off automation.

#### Steps:

1.  From your Shopify admin, go to **Settings** > [**Policies**](https://admin.shopify.com/settings/legal).
    
2.  In the **Written policies** section, click the policy that you want to customize.
    
3.  Turn off **Use automated policy**.
    
4.  Edit the policy content and review your changes.
    
5.  Click **Save**.
    

If you turn automation back on, then the automated template replaces your custom policy content. Keep a copy of your custom policy before switching back. If you sell in multiple languages, review your translated policies as well as your store's default-language policy when you change between automated and manual content.

You can export past versions of your return and refund policy, terms of service, shipping policy, contact information, and legal notice. Changes to these policies are archived and can be accessed in all configured languages. Shopify saves past policies for 2 years. It's your responsibility to maintain records of changes to your policies, as needed.

#### Steps:

1.  From your Shopify admin, go to **Settings** > [**Policies**](https://admin.shopify.com/settings/legal).
    
2.  In the **Written policies** section, click ![Horizontal menu](https://cdn.shopify.com/shopifycloud/help-center/manual/admin-icons/MenuHorizontalIcon.svg) > **Get past policies**.
    
3.  In the **Export policy history** dialog, select the policies that you want to export.
    
4.  In **Export as**, select a file format, and then click **Export**.
    

You can export several policies at the same time, including your privacy policy.

Liquid variables add information from your store settings to your automated policies. To change this information, update the source listed in the table, and then review your policy.

The return terms in your return and refund policy come from your [return rules](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/return-rules).

The **Used in** column lists the automated policies that display each variable's information.

These variables describe the automated policy templates. They aren't all available when you manually edit a policy. Always review your published policies to make sure that your business information is complete and accurate.

|     |     |     |     |
| --- | --- | --- | --- |Liquid variables used in automated store policies and their source settings.
| Variable | Used in | What it displays | Source |
| --- | --- | --- | --- |
| `address` | Contact information | Your store address, formatted for the policy's language. | **Settings** > **General** > **Store contact details** > **Store address**. |
| `contact_email` | Return and refund policy | The email address customers can use for return and cancellation questions. | Your [**Store email**](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-your-email#change-the-store-email-address) in **Settings** > **General**. |
| `contact_information_policy_link` | Terms of service | A link to your contact information policy. If the policy isn't visible on your storefront, then the policy name is displayed without a link. | Your contact information policy in **Settings** > **Policies**. |
| `last_updated` | Return and refund policy; Shipping policy | The date shown as the policy's last update. | The date is added when the policy is generated or updated. |
| `legal_business_name` | Contact information | Your company name. If you don't enter a company name, then your store name is used. | The company name in **Settings** > **General** > **Store contact details** > **Store address**. |
| `phone_number` | Contact information | Your store phone number. | **Settings** > **General** > **Store contact details**. |
| `privacy_policy_link` | Terms of service | A link to your privacy policy. If the policy isn't visible on your storefront, then the policy name is displayed without a link. | Your privacy policy in **Settings** > **Policies**. |
| `processing_time` | Shipping policy | Your fulfillment time, such as 2 business days. | Your [**Fulfillment time**](https://help.shopify.com/en/manual/fulfillment/setup/delivery-expectations/manual-delivery-dates#setup-manual) in **Settings** > **Shipping and delivery** > **Estimated delivery dates**. Used only when estimated delivery dates are set to **Manual** or **Automated**. |
| `refund_policy_link` | Terms of service | A link to your return and refund policy. If the policy isn't visible on your storefront, then the policy name is displayed without a link. | Your return and refund policy in **Settings** > **Policies**. |
| `request_eligibility_instructions` | Return and refund policy | A statement that return and cancellation requests depend on the policy terms and applicable law. | The statement is added from the automated policy template. |
| `shipping_destinations` | Shipping policy | The countries that you ship to. | Countries that are in both your [shipping zones](https://help.shopify.com/en/manual/international/shipping/shipping-zones) and region markets. |
| `shipping_policy_link` | Terms of service | A link to your shipping policy. If the policy isn't visible on your storefront, then the policy name is displayed without a link. | Your shipping policy in **Settings** > **Policies**. |
| `shop_name` | Terms of service; Shipping policy | Your store name. | **Settings** > **General** > **Store contact details**. |
| `store_name` | Contact information | Your store name, when it differs from the company name displayed in the policy. | **Settings** > **General** > **Store contact details**. |
| `support_contact` | Contact information | The email address customers can use to contact you. | Your [**Store email**](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-your-email#change-the-store-email-address) in **Settings** > **General**. |
| `support_email` | Terms of service; Shipping policy | The email address customers can use to contact you. | Your [**Store email**](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-your-email#change-the-store-email-address) in **Settings** > **General**. |
| `vat_number` | Contact information | Your European Union or United Kingdom VAT registration number. | Your tax registrations in **Settings** > **Taxes and duties**. If you have several eligible registrations, then the first one added is used. Import One-Stop Shop (IOSS) numbers aren't used. |

[Automated privacy settings](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings#automated-settings) can help your store comply with privacy laws.

When you set up a new store, automated privacy settings are activated by default. This feature helps simplify your store's compliance with privacy laws by automatically adjusting to certain changes in your store settings.

On an existing store, you can activate automated updates for your privacy policy, cookie banner, and data sharing opt-out page. Activating these updates helps keep your store aligned so your privacy policy will automatically be updated when you adjust certain settings, such as when you change your Shopify Network Intelligence setting. All updates are recorded in your Store activity log, which you should review regularly to monitor any changes.

If you don't want to use automation, or automation isn't available for a policy, then you can write and maintain the policy yourself. You can use HTML in the content of your store policies.

If you're using an app to offer product subscriptions in your store, then a generated template is displayed to your customers when the Purchase options cancellation policy in the Settings is blank. This policy is linked with the text **Subscription policy** in the checkout.

You're responsible for following your published policies. Review your policies carefully before adding them.

#### Steps:

1.  From your Shopify admin, go to **Settings** > [**Policies**](https://admin.shopify.com/settings/legal).
    
2.  In the **Written policies** section, click a policy that you want to add or edit.
    
3.  If **Use automated policy** is on, then turn it off.
    
4.  Enter or edit your store policy. If **Insert template** is available for the policy, then you can click it to start from a template. **Insert template** isn't available for policies that support automation. Use the [rich text editor](https://help.shopify.com/en/manual/shopify-admin/productivity-tools/rich-text-editor) to add style and formatting to your policy, and to add links and images.
    
5.  Review your policy and make any changes.
    
6.  Click **Save** to publish your policy.
    

After you add your store policies, they're automatically linked in the footer of your checkout pages. Customers might need to view your policies before they check out, so it's a good idea to [link those pages in your store menus](https://help.shopify.com/en/manual/online-store/menus-and-links/editing-menus#add-menu-item) or in the footer of your store pages.

If you sell in multiple languages, then review the policy content available to customers in each language. Make sure that translated policies accurately reflect your business practices and the commitments in your default-language policy.

The automated privacy policy has [separate language support and localization guidance](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings#localize-privacy).

You can create webpages in your Shopify admin. Webpages are useful for publishing information that rarely changes or that customers reference often, such as an About us page or a Contact us page.

Learn how to [add pages to your online store](https://help.shopify.com/en/manual/online-store/add-edit-pages), and [set up store menus](https://help.shopify.com/en/manual/online-store/menus-and-links).

If you use a [free theme from Shopify](https://help.shopify.com/en/manual/online-store/themes) that was downloaded after November 2018 and you've added your shipping policies, then the product pages on your online store include a link to your shipping policies. This is to communicate any additional costs associated with the product, or shipping conditions.

You can remove this link by editing your theme's language.

#### Steps:

1.  From your Shopify admin, go to [**Online Store**](https://admin.shopify.com/themes).
    
2.  Beside your current theme, click the ![Horizontal menu](https://cdn.shopify.com/shopifycloud/help-center/manual/admin-icons/MenuHorizontalIcon.svg) button > **Edit default theme content**.
    
3.  In the search box, enter shipping policy html.
    
4.  In the **Shipping policy html** box, replace the contents with a single space.
    
5.  Click **Save**.
    

By default, links to your policies are listed in your checkout footer. A link to your return policy is also listed on your order review page. A link to your shipping policy is listed on your product pages and your cart.

You can update your menus to include these policies.

#### Steps:

1.  From your Shopify admin, go to **Content** > [**Menus**](https://admin.shopify.com/content/menus).
    
2.  Click the name of the menu where you want to add the policy.
    
3.  Add the policies that you want to the menu:
    
    1.  Click **Add menu item**.
    2.  Enter a name for the policy's menu item, and then search for your policy.
    3.  Click **Add**.
4.  Click **Save menu**.
    

You can add direct links to your policies by adding the following to the end of your store's domain name:

*   Return policy: `/policies/refund-policy`
*   Privacy policy: `/policies/privacy-policy`
*   Terms of service: `/policies/terms-of-service`
*   Shipping policy: `/policies/shipping-policy`
*   Subscription policy: `/policies/subscription-policy`

For example, if your domain name is `johns-apparel.myshopify.com`, then a direct link to your shipping policy is `johns-apparel.myshopify.com/policies/shipping-policy`.