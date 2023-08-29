namespace Company.PunchlinePro.Identity.Controllers.Requests
{
    public class CreatePDFRequest
    {
        public string id { get; set; }
        public string? toEmail { get;set;}
        public string? name { get; set; }
        public string? address { get; set; }
        public string? attendeeFirstName { get; set; }
        public string? attendeeLastName { get; set; }
        public DateTime? date { get; set; }
        public SiteFeasibilityReport? SiteFeasibilityReport { get; set; }
    }
    public class SiteFeasibilityReport
    {
        public string? powerAvailability { get; set; }
        public string? powerAvailabilityComments { get; set; }
        public string? existingUtilityTransformerType { get; set; }
        public string? existingUtilityTransformerSize { get; set; }
        public string? transformerVoltage { get; set; }
        public string? utilityRule { get; set; }
        public string? tieInType { get; set; }
        public string? housePowerVoltage { get; set; }
        public string? utilityStructureNumber { get; set; }
        public string? powerImpactComments { get; set; }
        public string? transformerPhoto { get; set; }
        public string? tieInPhoto { get; set; }
        public string? parkingLotType { get; set; }
        public string? stallCount { get; set; }
        public string? parkingLotLighting { get; set; }
        public string? accessibilityRequired { get; set; }
        public string? accessibilityConcerns { get; set; }
        public string? carrierType { get; set; }
        public string? stallLocationsPhoto { get; set; }
        public string? cellularReceptionPhoto { get; set; }
        public string? currentFunding { get; set; }
        public string? fundingType { get; set; }
        public string? futureFunding { get; set; }
        public string? futureFundingDate { get; set; }
        public string? fundingRequirements { get; set; }
        public List<object> proposedSitePlan { get; set; }
        public List<object> additionalPhotos { get; set; }
        public string? stationCost { get; set; }
        public string? switchgearCost { get; set; }
        public string? utilityCost { get; set; }
        public string? engineeringCost { get; set; }
        public string? surveyCost { get; set; }
        public string? constructionCost { get; set; }
        public string? totalEstimatedCost { get; set; }
        public string? additionalNotes { get; set; }
    }
}
