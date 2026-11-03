---
source_url: https://schema.org/MerchantReturnPolicy
loaded_url: https://schema.org/MerchantReturnPolicy
title: ""
fetched_at: 
apify_run_id: BrDSV6rfarU6FOjBB
apify_dataset_id: igZjRvGRrtnhDuTVs
sha256: a5a28dc34abc826831596d98855c09f40417526eff1f6c420b467515fcff585a
quality: ok
---

# MerchantReturnPolicy - Schema.org Type

**Note**: You are viewing the development version of [Schema.org](https://schema.org/). See [how we work](https://schema.org/docs/howwework.html) for more details.

A Schema.org Type

A MerchantReturnPolicy provides information about product return policies associated with an [Organization](https://schema.org/Organization), [Product](https://schema.org/Product), or [Offer](https://schema.org/Offer).

| Property | Expected Type | Description |
| --- | --- | --- |
| Properties from [MerchantReturnPolicy](https://schema.org/MerchantReturnPolicy "MerchantReturnPolicy") |     |     |
| `[additionalProperty](https://schema.org/additionalProperty "additionalProperty")` | [PropertyValue](https://schema.org/PropertyValue "PropertyValue") | A property-value pair representing an additional characteristic of the entity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.<br><br>Note: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism. |
| `[applicableCountry](https://schema.org/applicableCountry "applicableCountry")` | [Country](https://schema.org/Country "Country")  or  <br>[Text](https://schema.org/Text "Text") | A country where a particular merchant return policy applies to, for example the two-letter ISO 3166-1 alpha-2 country code. |
| `[customerRemorseReturnFees](https://schema.org/customerRemorseReturnFees "customerRemorseReturnFees")` | [ReturnFeesEnumeration](https://schema.org/ReturnFeesEnumeration "ReturnFeesEnumeration") | The type of return fees if the product is returned due to customer remorse. |
| `[customerRemorseReturnLabelSource](https://schema.org/customerRemorseReturnLabelSource "customerRemorseReturnLabelSource")` | [ReturnLabelSourceEnumeration](https://schema.org/ReturnLabelSourceEnumeration "ReturnLabelSourceEnumeration") | The method (from an enumeration) by which the customer obtains a return shipping label for a product returned due to customer remorse. |
| `[customerRemorseReturnShippingFeesAmount](https://schema.org/customerRemorseReturnShippingFeesAmount "customerRemorseReturnShippingFeesAmount")` | [MonetaryAmount](https://schema.org/MonetaryAmount "MonetaryAmount") | The amount of shipping costs if a product is returned due to customer remorse. Applicable when property [customerRemorseReturnFees](https://schema.org/customerRemorseReturnFees) equals [ReturnShippingFees](https://schema.org/ReturnShippingFees). |
| `[inStoreReturnsOffered](https://schema.org/inStoreReturnsOffered "inStoreReturnsOffered")` | [Boolean](https://schema.org/Boolean "Boolean") | Are in-store returns offered? (For more advanced return methods use the [returnMethod](https://schema.org/returnMethod) property.) |
| `[itemCondition](https://schema.org/itemCondition "itemCondition")` | [OfferItemCondition](https://schema.org/OfferItemCondition "OfferItemCondition") | A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. |
| `[itemDefectReturnFees](https://schema.org/itemDefectReturnFees "itemDefectReturnFees")` | [ReturnFeesEnumeration](https://schema.org/ReturnFeesEnumeration "ReturnFeesEnumeration") | The type of return fees for returns of defect products. |
| `[itemDefectReturnLabelSource](https://schema.org/itemDefectReturnLabelSource "itemDefectReturnLabelSource")` | [ReturnLabelSourceEnumeration](https://schema.org/ReturnLabelSourceEnumeration "ReturnLabelSourceEnumeration") | The method (from an enumeration) by which the customer obtains a return shipping label for a defect product. |
| `[itemDefectReturnShippingFeesAmount](https://schema.org/itemDefectReturnShippingFeesAmount "itemDefectReturnShippingFeesAmount")` | [MonetaryAmount](https://schema.org/MonetaryAmount "MonetaryAmount") | Amount of shipping costs for defect product returns. Applicable when property [itemDefectReturnFees](https://schema.org/itemDefectReturnFees) equals [ReturnShippingFees](https://schema.org/ReturnShippingFees). |
| `[merchantReturnDays](https://schema.org/merchantReturnDays "merchantReturnDays")` | [Date](https://schema.org/Date "Date")  or  <br>[DateTime](https://schema.org/DateTime "DateTime")  or  <br>[Integer](https://schema.org/Integer "Integer") | Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the [returnPolicyCategory](https://schema.org/returnPolicyCategory) property is specified as [MerchantReturnFiniteReturnWindow](https://schema.org/MerchantReturnFiniteReturnWindow). Supersedes [productReturnDays](https://schema.org/productReturnDays "productReturnDays"). |
| `[merchantReturnLink](https://schema.org/merchantReturnLink "merchantReturnLink")` | [URL](https://schema.org/URL "URL") | Specifies a Web page or service by URL, for product returns. Supersedes [productReturnLink](https://schema.org/productReturnLink "productReturnLink"). |
| `[refundType](https://schema.org/refundType "refundType")` | [RefundTypeEnumeration](https://schema.org/RefundTypeEnumeration "RefundTypeEnumeration") | A refund type, from an enumerated list. |
| `[restockingFee](https://schema.org/restockingFee "restockingFee")` | [MonetaryAmount](https://schema.org/MonetaryAmount "MonetaryAmount")  or  <br>[Number](https://schema.org/Number "Number") | Use [MonetaryAmount](https://schema.org/MonetaryAmount) to specify a fixed restocking fee for product returns, or use [Number](https://schema.org/Number) to specify a percentage of the product price paid by the customer. |
| `[returnFees](https://schema.org/returnFees "returnFees")` | [ReturnFeesEnumeration](https://schema.org/ReturnFeesEnumeration "ReturnFeesEnumeration") | The type of return fees for purchased products (for any return reason). |
| `[returnLabelSource](https://schema.org/returnLabelSource "returnLabelSource")` | [ReturnLabelSourceEnumeration](https://schema.org/ReturnLabelSourceEnumeration "ReturnLabelSourceEnumeration") | The method (from an enumeration) by which the customer obtains a return shipping label for a product returned for any reason. |
| `[returnMethod](https://schema.org/returnMethod "returnMethod")` | [ReturnMethodEnumeration](https://schema.org/ReturnMethodEnumeration "ReturnMethodEnumeration") | The type of return method offered, specified from an enumeration. |
| `[returnPolicyCategory](https://schema.org/returnPolicyCategory "returnPolicyCategory")` | [MerchantReturnEnumeration](https://schema.org/MerchantReturnEnumeration "MerchantReturnEnumeration") | Specifies an applicable return policy (from an enumeration). |
| `[returnPolicyCountry](https://schema.org/returnPolicyCountry "returnPolicyCountry")` | [Country](https://schema.org/Country "Country")  or  <br>[Text](https://schema.org/Text "Text") | The country where the product has to be sent to for returns, for example "Ireland" using the [name](https://schema.org/name) property of [Country](https://schema.org/Country). You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). Note that this can be different from the country where the product was originally shipped from or sent to. |
| `[returnPolicySeasonalOverride](https://schema.org/returnPolicySeasonalOverride "returnPolicySeasonalOverride")` | [MerchantReturnPolicySeasonalOverride](https://schema.org/MerchantReturnPolicySeasonalOverride "MerchantReturnPolicySeasonalOverride") | Seasonal override of a return policy. |
| `[returnShippingFeesAmount](https://schema.org/returnShippingFeesAmount "returnShippingFeesAmount")` | [MonetaryAmount](https://schema.org/MonetaryAmount "MonetaryAmount") | Amount of shipping costs for product returns (for any reason). Applicable when property [returnFees](https://schema.org/returnFees) equals [ReturnShippingFees](https://schema.org/ReturnShippingFees). |
| `[validForMemberTier](https://schema.org/validForMemberTier "validForMemberTier")` | [MemberProgramTier](https://schema.org/MemberProgramTier "MemberProgramTier") | The membership program tier(s) an Offer (or a PriceSpecification, OfferShippingDetails, or MerchantReturnPolicy under an Offer) is valid for. |
| Properties from [Thing](https://schema.org/Thing "Thing") |     |     |
| `[additionalType](https://schema.org/additionalType "additionalType")` | [Text](https://schema.org/Text "Text")  or  <br>[URL](https://schema.org/URL "URL") | An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. Typically the value is a URI-identified RDF class, and in this case corresponds to the use of rdf:type in RDF. Text values can be used sparingly, for cases where useful information can be added without their being an appropriate schema to reference. In the case of text values, the class label should follow the schema.org [style guide](https://schema.org/docs/styleguide.html). |
| `[alternateName](https://schema.org/alternateName "alternateName")` | [Text](https://schema.org/Text "Text") | An alias for the item. |
| `[description](https://schema.org/description "description")` | [Text](https://schema.org/Text "Text")  or  <br>[TextObject](https://schema.org/TextObject "TextObject") | A description of the item. |
| `[disambiguatingDescription](https://schema.org/disambiguatingDescription "disambiguatingDescription")` | [Text](https://schema.org/Text "Text") | A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation. |
| `[identifier](https://schema.org/identifier "identifier")` | [PropertyValue](https://schema.org/PropertyValue "PropertyValue")  or  <br>[Text](https://schema.org/Text "Text")  or  <br>[URL](https://schema.org/URL "URL") | The identifier property represents any kind of identifier for any kind of [Thing](https://schema.org/Thing), such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](https://schema.org/docs/datamodel.html#identifierBg) for more details. |
| `[image](https://schema.org/image "image")` | [ImageObject](https://schema.org/ImageObject "ImageObject")  or  <br>[URL](https://schema.org/URL "URL") | An image of the item. This can be a [URL](https://schema.org/URL) or a fully described [ImageObject](https://schema.org/ImageObject). |
| `[mainEntityOfPage](https://schema.org/mainEntityOfPage "mainEntityOfPage")` | [CreativeWork](https://schema.org/CreativeWork "CreativeWork")  or  <br>[URL](https://schema.org/URL "URL") | Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See [background notes](https://schema.org/docs/datamodel.html#mainEntityBackground) for details.  <br>Inverse property: [mainEntity](https://schema.org/mainEntity "mainEntity") |
| `[name](https://schema.org/name "name")` | [Text](https://schema.org/Text "Text") | The name of the item. |
| `[owner](https://schema.org/owner "owner")` | [Organization](https://schema.org/Organization "Organization")  or  <br>[Person](https://schema.org/Person "Person") | A person or organization who owns this Thing.  <br>Inverse property: [owns](https://schema.org/owns "owns") |
| `[potentialAction](https://schema.org/potentialAction "potentialAction")` | [Action](https://schema.org/Action "Action") | Indicates a potential Action, which describes an idealized action in which this thing would play an 'object' role. |
| `[sameAs](https://schema.org/sameAs "sameAs")` | [URL](https://schema.org/URL "URL") | URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. |
| `[subjectOf](https://schema.org/subjectOf "subjectOf")` | [CreativeWork](https://schema.org/CreativeWork "CreativeWork")  or  <br>[Event](https://schema.org/Event "Event") | A CreativeWork or Event about this Thing.  <br>Inverse property: [about](https://schema.org/about "about") |
| `[url](https://schema.org/url "url")` | [URL](https://schema.org/URL "URL") | URL of the item. |

Instances of [MerchantReturnPolicy](https://schema.org/MerchantReturnPolicy "MerchantReturnPolicy") may appear as a value for the following properties

| Property | On Types | Description |
| --- | --- | --- |
| [hasMerchantReturnPolicy](https://schema.org/hasMerchantReturnPolicy "hasMerchantReturnPolicy") | [Offer](https://schema.org/Offer "Offer")  or  <br>[Organization](https://schema.org/Organization "Organization")  or  <br>[Product](https://schema.org/Product "Product") | Specifies a MerchantReturnPolicy that may be applicable. |

| Supersedes |
| --- |
| `[ProductReturnPolicy](https://schema.org/ProductReturnPolicy "ProductReturnPolicy")` |

#### Source

[https://github.com/schemaorg/schemaorg/issues/2288](https://github.com/schemaorg/schemaorg/issues/2288)