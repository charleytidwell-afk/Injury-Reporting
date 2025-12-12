import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { PhotoUpload } from './PhotoUpload';

interface InvestigationProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function Investigation({ data, onUpdate }: InvestigationProps) {
  const [formData, setFormData] = useState({
    employee: '',
    jobTitle: '',
    employeeIdNumber: '',
    originalDateOfHire: '',
    locationOfIncident: '',
    dateOfIncident: '',
    shiftEmployeeWorked: '',
    natureOfInjuryAndBodyParts: '',
    witness1: '',
    witness2: '',
    witness3: '',
    locationOfWitness: '',
    incidentDescription: '',
    accidentScene: '',
    didBreakSafetyRule: '',
    breakSafetyRuleExplanation: '',
    supervisorCorrectiveAction: '',
    investigatedBy: '',
    investigationDate: '',
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
      <div className="bg-black text-white px-4 py-2 -mx-8 -mt-8 mb-6">
        <h2 className="text-white text-center">SUPERVISOR-Injury/Illness Report</h2>
      </div>

      {/* Employee & Job Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employee" className="uppercase text-xs">Employee</Label>
          <Input
            id="employee"
            value={formData.employee}
            onChange={(e) => handleChange('employee', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="uppercase text-xs">Job Title</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            className="border-black"
            required
          />
        </div>
      </div>

      {/* Employee ID & Original Date of Hire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employeeIdNumber" className="uppercase text-xs">Employee ID Number (From UKG):</Label>
          <Input
            id="employeeIdNumber"
            value={formData.employeeIdNumber}
            onChange={(e) => handleChange('employeeIdNumber', e.target.value)}
            className="border-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="originalDateOfHire" className="uppercase text-xs">Original Date of Hire:</Label>
          <Input
            id="originalDateOfHire"
            type="date"
            value={formData.originalDateOfHire}
            onChange={(e) => handleChange('originalDateOfHire', e.target.value)}
            className="border-black"
          />
        </div>
      </div>

      {/* Location, Date & Shift */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="locationOfIncident" className="uppercase text-xs">Location of Incident:</Label>
          <Input
            id="locationOfIncident"
            value={formData.locationOfIncident}
            onChange={(e) => handleChange('locationOfIncident', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfIncident" className="uppercase text-xs">Date of Incident:</Label>
          <Input
            id="dateOfIncident"
            type="date"
            value={formData.dateOfIncident}
            onChange={(e) => handleChange('dateOfIncident', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="uppercase text-xs">Shift Employee Worked:</Label>
          <div className="flex gap-4 items-center h-10 border border-black px-3 rounded-md">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shiftEmployeeWorked"
                value="A"
                checked={formData.shiftEmployeeWorked === 'A'}
                onChange={(e) => handleChange('shiftEmployeeWorked', e.target.value)}
              />
              <span>A</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shiftEmployeeWorked"
                value="B"
                checked={formData.shiftEmployeeWorked === 'B'}
                onChange={(e) => handleChange('shiftEmployeeWorked', e.target.value)}
              />
              <span>B</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shiftEmployeeWorked"
                value="C"
                checked={formData.shiftEmployeeWorked === 'C'}
                onChange={(e) => handleChange('shiftEmployeeWorked', e.target.value)}
              />
              <span>C</span>
            </label>
          </div>
        </div>
      </div>

      {/* Nature of Injury */}
      <div className="space-y-2">
        <Label htmlFor="natureOfInjuryAndBodyParts" className="uppercase text-xs">
          Nature of Injury and Affected Body Part(s):
        </Label>
        <Textarea
          id="natureOfInjuryAndBodyParts"
          value={formData.natureOfInjuryAndBodyParts}
          onChange={(e) => handleChange('natureOfInjuryAndBodyParts', e.target.value)}
          className="border-black min-h-[100px]"
          required
        />
      </div>

      {/* Witnesses Section */}
      <div className="border-t-2 border-black pt-6">
        <div className="mb-4">
          <Label className="uppercase text-xs">Witnesses:</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="uppercase text-xs">Name</Label>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="witness1" className="text-xs">Witness #1</Label>
                <Input
                  id="witness1"
                  value={formData.witness1}
                  onChange={(e) => handleChange('witness1', e.target.value)}
                  className="border-black"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="witness2" className="text-xs">Witness #2</Label>
                <Input
                  id="witness2"
                  value={formData.witness2}
                  onChange={(e) => handleChange('witness2', e.target.value)}
                  className="border-black"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="witness3" className="text-xs">Witness #3</Label>
                <Input
                  id="witness3"
                  value={formData.witness3}
                  onChange={(e) => handleChange('witness3', e.target.value)}
                  className="border-black"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationOfWitness" className="uppercase text-xs">
              Location of Witness Ex: Helping EE Lift Object
            </Label>
            <Textarea
              id="locationOfWitness"
              value={formData.locationOfWitness}
              onChange={(e) => handleChange('locationOfWitness', e.target.value)}
              className="border-black min-h-[120px]"
            />
          </div>
        </div>
      </div>

      {/* Incident Description */}
      <div className="border-t-2 border-black pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="incidentDescription" className="uppercase text-xs">
            Incident Description:
          </Label>
          <p className="text-xs mb-2">
            <span className="bg-black text-white px-1">Describe in detail how the incident occurred, include events, actions, causes leading to the incident.</span>
          </p>
          <Textarea
            id="incidentDescription"
            value={formData.incidentDescription}
            onChange={(e) => handleChange('incidentDescription', e.target.value)}
            className="border-black min-h-[120px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accidentScene" className="uppercase text-xs">
            Accident Scene:
          </Label>
          <p className="text-xs mb-2">Location where accident occurred</p>
          <Textarea
            id="accidentScene"
            value={formData.accidentScene}
            onChange={(e) => handleChange('accidentScene', e.target.value)}
            className="border-black min-h-[100px]"
          />
        </div>
      </div>

      {/* Safety Rule Question */}
      <div className="border-t-2 border-black pt-6 space-y-4">
        <div className="space-y-2">
          <Label className="uppercase text-xs">
            Did the accident occur from breaking an established safety rule or policy?
          </Label>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="didBreakSafetyRule"
                value="Y"
                checked={formData.didBreakSafetyRule === 'Y'}
                onChange={(e) => handleChange('didBreakSafetyRule', e.target.value)}
              />
              <span>Y</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="didBreakSafetyRule"
                value="N"
                checked={formData.didBreakSafetyRule === 'N'}
                onChange={(e) => handleChange('didBreakSafetyRule', e.target.value)}
              />
              <span>N</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="breakSafetyRuleExplanation" className="uppercase text-xs">If "Yes" Explain:</Label>
          <Textarea
            id="breakSafetyRuleExplanation"
            value={formData.breakSafetyRuleExplanation}
            onChange={(e) => handleChange('breakSafetyRuleExplanation', e.target.value)}
            className="border-black min-h-[80px]"
            disabled={formData.didBreakSafetyRule !== 'Y'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supervisorCorrectiveAction" className="uppercase text-xs text-red-600">
            Supervisor's Corrective Action to ensure this type of accident does not recur. Determine root cause
          </Label>
          <Textarea
            id="supervisorCorrectiveAction"
            value={formData.supervisorCorrectiveAction}
            onChange={(e) => handleChange('supervisorCorrectiveAction', e.target.value)}
            className="border-black min-h-[100px]"
            required
          />
        </div>
      </div>

      {/* Investigation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="investigatedBy" className="uppercase text-xs">Investigated By:</Label>
          <Input
            id="investigatedBy"
            value={formData.investigatedBy}
            onChange={(e) => handleChange('investigatedBy', e.target.value)}
            className="border-black"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="investigationDate" className="uppercase text-xs">Date:</Label>
          <Input
            id="investigationDate"
            type="date"
            value={formData.investigationDate}
            onChange={(e) => handleChange('investigationDate', e.target.value)}
            className="border-black"
            required
          />
        </div>
      </div>

      {/* Investigation Photos */}
      <div className="border-t-2 border-black pt-6">
        <PhotoUpload
          photos={formData.photos}
          onChange={(photos) => handleChange('photos', photos)}
          label="Investigation Evidence Photos"
          maxPhotos={15}
        />
      </div>
    </div>
  );
}