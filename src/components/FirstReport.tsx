import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { PhotoUpload } from './PhotoUpload';

interface FirstReportProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function FirstReport({ data, onUpdate }: FirstReportProps) {
  const [formData, setFormData] = useState({
    employeeName: '',
    plant: '',
    dateOfReport: '',
    socialSecurityNumber: '',
    sex: '',
    dateTimeOfIncident: '',
    dateOfIncident: '',
    timeOfIncident: '',
    addressExcludingCity: '',
    phoneNumber: '',
    emailAddress: '',
    emergencyContactNamePhone: '',
    bodyPartInjured: '',
    bodyPartInjuredOther: '',
    howDidIncidentHappen: '',
    jobTitle: '',
    whereWereYou: '',
    witness1Name: '',
    witness1Position: '',
    witness2Name: '',
    witness2Position: '',
    witness3Name: '',
    witness3Position: '',
    whereWereWitnesses: '',
    reportedRightAway: '',
    whyDelayedReport: '',
    preventionSuggestion: '',
    osha300CaseNumber: '',
    osha300Applicable: '',
    photos: [],
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Employee Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employeeName" className="uppercase text-xs">Employee</Label>
          <Input
            id="employeeName"
            value={formData.employeeName}
            onChange={(e) => handleChange('employeeName', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plant" className="uppercase text-xs">Plant</Label>
          <Input
            id="plant"
            value={formData.plant}
            onChange={(e) => handleChange('plant', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfReport" className="uppercase text-xs">Date of Report</Label>
          <Input
            id="dateOfReport"
            type="date"
            value={formData.dateOfReport}
            onChange={(e) => handleChange('dateOfReport', e.target.value)}
            className="border-black"
            required
          />
        </div>
      </div>

      {/* Social Security & Sex & Date/Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="socialSecurityNumber" className="uppercase text-xs">Social Security Number</Label>
          <Input
            id="socialSecurityNumber"
            placeholder="XXX-XX-XXXX"
            value={formData.socialSecurityNumber}
            onChange={(e) => handleChange('socialSecurityNumber', e.target.value)}
            className="border-black"
          />
        </div>
        <div className="space-y-2">
          <Label className="uppercase text-xs">Sex</Label>
          <div className="flex gap-4 items-center h-10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value="M"
                checked={formData.sex === 'M'}
                onChange={(e) => handleChange('sex', e.target.value)}
              />
              <span>M</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value="F"
                checked={formData.sex === 'F'}
                onChange={(e) => handleChange('sex', e.target.value)}
              />
              <span>F</span>
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateTimeOfIncident" className="uppercase text-xs">Date & Time of Incident</Label>
          <Input
            id="dateTimeOfIncident"
            type="datetime-local"
            value={formData.dateTimeOfIncident}
            onChange={(e) => handleChange('dateTimeOfIncident', e.target.value)}
            className="border-black"
            required
          />
        </div>
      </div>

      {/* Address & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addressExcludingCity" className="uppercase text-xs">Address, Excluding City and State:</Label>
          <Input
            id="addressExcludingCity"
            value={formData.addressExcludingCity}
            onChange={(e) => handleChange('addressExcludingCity', e.target.value)}
            className="border-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="uppercase text-xs">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            className="border-black"
          />
        </div>
      </div>

      {/* Email & Emergency Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emailAddress" className="uppercase text-xs">Email Address:</Label>
          <Input
            id="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleChange('emailAddress', e.target.value)}
            className="border-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContactNamePhone" className="uppercase text-xs">Emergency Contact Name & Phone Number</Label>
          <Input
            id="emergencyContactNamePhone"
            value={formData.emergencyContactNamePhone}
            onChange={(e) => handleChange('emergencyContactNamePhone', e.target.value)}
            className="border-black"
          />
        </div>
      </div>

      {/* OSHA 300 Case Number */}
      <div className="space-y-2">
        <Label className="uppercase text-xs">OSHA 300 Applicable?</Label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="osha300Applicable"
              value="Y"
              checked={formData.osha300Applicable === 'Y'}
              onChange={(e) => handleChange('osha300Applicable', e.target.value)}
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="osha300Applicable"
              value="N"
              checked={formData.osha300Applicable === 'N'}
              onChange={(e) => handleChange('osha300Applicable', e.target.value)}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {formData.osha300Applicable === 'Y' && (
        <div className="space-y-2">
          <Label htmlFor="osha300CaseNumber" className="uppercase text-xs">OSHA 300 Case Number</Label>
          <Input
            id="osha300CaseNumber"
            placeholder="e.g., 2024-001"
            value={formData.osha300CaseNumber}
            onChange={(e) => handleChange('osha300CaseNumber', e.target.value)}
            className="border-black"
          />
          <p className="text-xs text-slate-500">
            Enter the OSHA 300 Log case number for this recordable injury or illness
          </p>
        </div>
      )}

      {/* Body Part Injured */}
      <div className="space-y-2">
        <Label htmlFor="bodyPartInjured" className="uppercase text-xs">
          What part of your body was injured or hurt?
        </Label>
        <Select
          value={formData.bodyPartInjured}
          onValueChange={(value) => handleChange('bodyPartInjured', value)}
        >
          <SelectTrigger className="border-black">
            <SelectValue placeholder="Select body part" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Head">Head</SelectItem>
            <SelectItem value="Eyes">Eyes</SelectItem>
            <SelectItem value="Face">Face</SelectItem>
            <SelectItem value="Neck">Neck</SelectItem>
            <SelectItem value="Shoulder - Left">Shoulder - Left</SelectItem>
            <SelectItem value="Shoulder - Right">Shoulder - Right</SelectItem>
            <SelectItem value="Arm - Left">Arm - Left</SelectItem>
            <SelectItem value="Arm - Right">Arm - Right</SelectItem>
            <SelectItem value="Elbow - Left">Elbow - Left</SelectItem>
            <SelectItem value="Elbow - Right">Elbow - Right</SelectItem>
            <SelectItem value="Wrist - Left">Wrist - Left</SelectItem>
            <SelectItem value="Wrist - Right">Wrist - Right</SelectItem>
            <SelectItem value="Hand - Left">Hand - Left</SelectItem>
            <SelectItem value="Hand - Right">Hand - Right</SelectItem>
            <SelectItem value="Finger(s) - Left">Finger(s) - Left</SelectItem>
            <SelectItem value="Finger(s) - Right">Finger(s) - Right</SelectItem>
            <SelectItem value="Chest">Chest</SelectItem>
            <SelectItem value="Back - Upper">Back - Upper</SelectItem>
            <SelectItem value="Back - Lower">Back - Lower</SelectItem>
            <SelectItem value="Abdomen">Abdomen</SelectItem>
            <SelectItem value="Hip - Left">Hip - Left</SelectItem>
            <SelectItem value="Hip - Right">Hip - Right</SelectItem>
            <SelectItem value="Leg - Left">Leg - Left</SelectItem>
            <SelectItem value="Leg - Right">Leg - Right</SelectItem>
            <SelectItem value="Knee - Left">Knee - Left</SelectItem>
            <SelectItem value="Knee - Right">Knee - Right</SelectItem>
            <SelectItem value="Ankle - Left">Ankle - Left</SelectItem>
            <SelectItem value="Ankle - Right">Ankle - Right</SelectItem>
            <SelectItem value="Foot - Left">Foot - Left</SelectItem>
            <SelectItem value="Foot - Right">Foot - Right</SelectItem>
            <SelectItem value="Toe(s) - Left">Toe(s) - Left</SelectItem>
            <SelectItem value="Toe(s) - Right">Toe(s) - Right</SelectItem>
            <SelectItem value="Multiple Body Parts">Multiple Body Parts</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-slate-500">
          Select the primary body part injured. If multiple injuries, select "Multiple Body Parts" and describe below.
        </p>
      </div>

      {/* Additional Body Part Details */}
      {(formData.bodyPartInjured === 'Multiple Body Parts' || formData.bodyPartInjured === 'Other') && (
        <div className="space-y-2">
          <Label htmlFor="bodyPartInjuredOther" className="uppercase text-xs">
            {formData.bodyPartInjured === 'Multiple Body Parts' 
              ? 'List all injured body parts:' 
              : 'Specify body part:'}
          </Label>
          <Textarea
            id="bodyPartInjuredOther"
            value={formData.bodyPartInjuredOther}
            onChange={(e) => handleChange('bodyPartInjuredOther', e.target.value)}
            className="border-black min-h-[80px]"
            required
          />
        </div>
      )}

      {/* How Did Incident Happen */}
      <div className="space-y-2">
        <Label htmlFor="howDidIncidentHappen" className="uppercase text-xs">
          How did the incident happen? Describe in detail how you were injured & what you were doing
        </Label>
        <Textarea
          id="howDidIncidentHappen"
          value={formData.howDidIncidentHappen}
          onChange={(e) => handleChange('howDidIncidentHappen', e.target.value)}
          className="border-black min-h-[120px]"
          required
        />
      </div>

      {/* Job Title & Where Were You */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="uppercase text-xs">Job Title:</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whereWereYou" className="uppercase text-xs">Where were you when this happened?</Label>
          <Input
            id="whereWereYou"
            value={formData.whereWereYou}
            onChange={(e) => handleChange('whereWereYou', e.target.value)}
            className="border-black"
            required
          />
        </div>
      </div>

      {/* Witnesses Section */}
      <div className="border-t-2 border-black pt-6">
        <h3 className="uppercase text-xs mb-4">Did anyone see the incident happen?</h3>
        
        <div className="space-y-3">
          {/* Witness 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="witness1Name" className="uppercase text-xs">Witness 1 - Name</Label>
              <Input
                id="witness1Name"
                value={formData.witness1Name}
                onChange={(e) => handleChange('witness1Name', e.target.value)}
                className="border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="witness1Position" className="uppercase text-xs">Position</Label>
              <Input
                id="witness1Position"
                value={formData.witness1Position}
                onChange={(e) => handleChange('witness1Position', e.target.value)}
                className="border-black"
              />
            </div>
          </div>

          {/* Witness 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="witness2Name" className="uppercase text-xs">Witness 2 - Name</Label>
              <Input
                id="witness2Name"
                value={formData.witness2Name}
                onChange={(e) => handleChange('witness2Name', e.target.value)}
                className="border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="witness2Position" className="uppercase text-xs">Position</Label>
              <Input
                id="witness2Position"
                value={formData.witness2Position}
                onChange={(e) => handleChange('witness2Position', e.target.value)}
                className="border-black"
              />
            </div>
          </div>

          {/* Witness 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="witness3Name" className="uppercase text-xs">Witness 3 - Name</Label>
              <Input
                id="witness3Name"
                value={formData.witness3Name}
                onChange={(e) => handleChange('witness3Name', e.target.value)}
                className="border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="witness3Position" className="uppercase text-xs">Position</Label>
              <Input
                id="witness3Position"
                value={formData.witness3Position}
                onChange={(e) => handleChange('witness3Position', e.target.value)}
                className="border-black"
              />
            </div>
          </div>

          {/* Where Were Witnesses */}
          <div className="space-y-2">
            <Label htmlFor="whereWereWitnesses" className="uppercase text-xs">
              Where were these people? (Example: working next to you)
            </Label>
            <Input
              id="whereWereWitnesses"
              value={formData.whereWereWitnesses}
              onChange={(e) => handleChange('whereWereWitnesses', e.target.value)}
              className="border-black"
            />
          </div>
        </div>
      </div>

      {/* Reporting Questions */}
      <div className="border-t-2 border-black pt-6 space-y-4">
        <div className="space-y-2">
          <Label className="uppercase text-xs">Did you report this right away?</Label>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="reportedRightAway"
                value="Y"
                checked={formData.reportedRightAway === 'Y'}
                onChange={(e) => handleChange('reportedRightAway', e.target.value)}
              />
              <span>Y</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="reportedRightAway"
                value="N"
                checked={formData.reportedRightAway === 'N'}
                onChange={(e) => handleChange('reportedRightAway', e.target.value)}
              />
              <span>N</span>
            </label>
            <div className="flex-1 ml-4">
              <Label htmlFor="whyDelayedReport" className="uppercase text-xs">If No, Why Did You Wait?</Label>
              <Input
                id="whyDelayedReport"
                value={formData.whyDelayedReport}
                onChange={(e) => handleChange('whyDelayedReport', e.target.value)}
                className="border-black mt-1"
                disabled={formData.reportedRightAway !== 'N'}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preventionSuggestion" className="uppercase text-xs bg-black text-white px-2 py-1 inline-block">
            In your opinion, is there anything that could be done to prevent this from happening
          </Label>
          <Textarea
            id="preventionSuggestion"
            value={formData.preventionSuggestion}
            onChange={(e) => handleChange('preventionSuggestion', e.target.value)}
            className="border-black min-h-[100px]"
          />
        </div>
      </div>

      {/* Photos */}
      <div className="border-t-2 border-black pt-6">
        <PhotoUpload
          photos={formData.photos}
          onChange={(photos) => handleChange('photos', photos)}
          label="Incident Scene Photos"
          maxPhotos={10}
        />
      </div>
    </div>
  );
}