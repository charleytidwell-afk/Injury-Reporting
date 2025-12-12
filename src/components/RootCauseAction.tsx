import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Plus, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { PhotoUpload } from './PhotoUpload';

interface RootCauseActionProps {
  data: any;
  onUpdate: (data: any) => void;
}

interface CorrectiveAction {
  action: string;
  responsible: string;
  dueDate: string;
  status: string;
}

export function RootCauseAction({ data, onUpdate }: RootCauseActionProps) {
  const [formData, setFormData] = useState({
    rootCauseMethod: '',
    immediateRootCause: '',
    underlyingRootCause: '',
    systemicIssues: '',
    whyAnalysis: ['', '', '', '', ''],
    correctiveActions: [
      { action: '', responsible: '', dueDate: '', status: 'pending' }
    ] as CorrectiveAction[],
    preventiveMeasures: '',
    policyChanges: '',
    trainingNeeds: '',
    verificationMethod: '',
    verificationDate: '',
    effectiveness: '',
    lessonsLearned: '',
    photos: [],
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateWhyAnalysis = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      whyAnalysis: prev.whyAnalysis.map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addCorrectiveAction = () => {
    setFormData(prev => ({
      ...prev,
      correctiveActions: [
        ...prev.correctiveActions,
        { action: '', responsible: '', dueDate: '', status: 'pending' }
      ]
    }));
  };

  const removeCorrectiveAction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      correctiveActions: prev.correctiveActions.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateCorrectiveAction = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      correctiveActions: prev.correctiveActions.map((item: CorrectiveAction, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-1">Root Cause & Corrective Action</h2>
        <p className="text-slate-600">Identify root causes and implement corrective measures</p>
      </div>

      {/* Root Cause Analysis Method */}
      <div className="space-y-2">
        <Label htmlFor="rootCauseMethod">Root Cause Analysis Method</Label>
        <Select value={formData.rootCauseMethod} onValueChange={(value) => handleChange('rootCauseMethod', value)}>
          <SelectTrigger id="rootCauseMethod">
            <SelectValue placeholder="Select analysis method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5-whys">5 Whys</SelectItem>
            <SelectItem value="fishbone">Fishbone Diagram</SelectItem>
            <SelectItem value="fault-tree">Fault Tree Analysis</SelectItem>
            <SelectItem value="barrier-analysis">Barrier Analysis</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Root Cause Identification */}
      <div className="border-t pt-6">
        <h3 className="text-slate-900 mb-4">Root Cause Identification</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="immediateRootCause">Immediate Root Cause *</Label>
            <Textarea
              id="immediateRootCause"
              placeholder="What directly caused the incident?"
              value={formData.immediateRootCause}
              onChange={(e) => handleChange('immediateRootCause', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="underlyingRootCause">Underlying Root Cause *</Label>
            <Textarea
              id="underlyingRootCause"
              placeholder="What systemic issues allowed this to happen?"
              value={formData.underlyingRootCause}
              onChange={(e) => handleChange('underlyingRootCause', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemicIssues">Systemic Issues Identified</Label>
            <Textarea
              id="systemicIssues"
              placeholder="Organizational or process issues that contributed..."
              value={formData.systemicIssues}
              onChange={(e) => handleChange('systemicIssues', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* 5 Whys Analysis */}
      <div className="border-t pt-6">
        <h3 className="text-slate-900 mb-4">5 Whys Analysis</h3>
        <p className="text-slate-600 text-sm mb-4">Ask "why" five times to drill down to the root cause</p>
        
        <div className="space-y-3">
          {formData.whyAnalysis.map((why: string, index: number) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`why-${index}`}>Why #{index + 1}</Label>
              <Input
                id={`why-${index}`}
                placeholder={`Why did this happen?`}
                value={why}
                onChange={(e) => updateWhyAnalysis(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Corrective Actions */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-slate-900">Corrective Actions</h3>
            <p className="text-slate-600 text-sm">Actions to prevent recurrence</p>
          </div>
          <Button type="button" onClick={addCorrectiveAction} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Action
          </Button>
        </div>

        <div className="space-y-4">
          {formData.correctiveActions.map((action: CorrectiveAction, index: number) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Action #{index + 1}</span>
                {formData.correctiveActions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeCorrectiveAction(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`action-${index}`}>Corrective Action *</Label>
                <Textarea
                  id={`action-${index}`}
                  placeholder="Describe the corrective action to be taken..."
                  value={action.action}
                  onChange={(e) => updateCorrectiveAction(index, 'action', e.target.value)}
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`responsible-${index}`}>Responsible Person *</Label>
                  <Input
                    id={`responsible-${index}`}
                    placeholder="Name"
                    value={action.responsible}
                    onChange={(e) => updateCorrectiveAction(index, 'responsible', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`dueDate-${index}`}>Due Date *</Label>
                  <Input
                    id={`dueDate-${index}`}
                    type="date"
                    value={action.dueDate}
                    onChange={(e) => updateCorrectiveAction(index, 'dueDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`status-${index}`}>Status</Label>
                  <Select 
                    value={action.status} 
                    onValueChange={(value) => updateCorrectiveAction(index, 'status', value)}
                  >
                    <SelectTrigger id={`status-${index}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preventive Measures */}
      <div className="border-t pt-6">
        <h3 className="text-slate-900 mb-4">Preventive Measures</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preventiveMeasures">Long-term Prevention Strategy</Label>
            <Textarea
              id="preventiveMeasures"
              placeholder="What measures will prevent similar incidents in the future?"
              value={formData.preventiveMeasures}
              onChange={(e) => handleChange('preventiveMeasures', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="policyChanges">Policy/Procedure Changes</Label>
            <Textarea
              id="policyChanges"
              placeholder="Required updates to policies or procedures..."
              value={formData.policyChanges}
              onChange={(e) => handleChange('policyChanges', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainingNeeds">Training Needs</Label>
            <Textarea
              id="trainingNeeds"
              placeholder="Additional training required for employees..."
              value={formData.trainingNeeds}
              onChange={(e) => handleChange('trainingNeeds', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Verification and Follow-up */}
      <div className="border-t pt-6">
        <h3 className="text-slate-900 mb-4">Verification & Follow-up</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationMethod">Verification Method</Label>
            <Input
              id="verificationMethod"
              placeholder="How will effectiveness be verified?"
              value={formData.verificationMethod}
              onChange={(e) => handleChange('verificationMethod', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="verificationDate">Verification Date</Label>
              <Input
                id="verificationDate"
                type="date"
                value={formData.verificationDate}
                onChange={(e) => handleChange('verificationDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="effectiveness">Effectiveness Rating</Label>
              <Select value={formData.effectiveness} onValueChange={(value) => handleChange('effectiveness', value)}>
                <SelectTrigger id="effectiveness">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-verified">Not Yet Verified</SelectItem>
                  <SelectItem value="effective">Effective</SelectItem>
                  <SelectItem value="partially-effective">Partially Effective</SelectItem>
                  <SelectItem value="not-effective">Not Effective</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lessonsLearned">Lessons Learned</Label>
            <Textarea
              id="lessonsLearned"
              placeholder="Key takeaways and lessons learned from this incident..."
              value={formData.lessonsLearned}
              onChange={(e) => handleChange('lessonsLearned', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Corrective Action Photos */}
      <div className="border-t pt-6">
        <PhotoUpload
          photos={formData.photos}
          onChange={(photos) => handleChange('photos', photos)}
          label="Corrective Action Documentation Photos"
          maxPhotos={10}
        />
      </div>
    </div>
  );
}