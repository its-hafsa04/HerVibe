'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Slider } from '../../components/ui/slider';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import Header from '@/components/header';

export default function MoodAssessment() {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState(null);
  const [error, setError] = useState(null);
  
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      mood: 5,
      energy: 5,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get activities');
      }
      
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      
      setActivities(result);
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setError('Failed to get activities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-b from-gray-50 to-[#9e6bd6] min-h-screen'>
    <Header/>
    <div className='w-[600px] mx-auto mt-6'>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-[#e5d9f2] p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="mood">How are you feeling today?</Label>
            <Slider
              id="mood"
              min={1}
              max={10}
              step={1}
              defaultValue={[5]}
              onValueChange={(value) => setValue('mood', value[0])}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Very Low 😢</span>
              <span>Very High 😃</span>
            </div>
          </div>

          <div>
            <Label htmlFor="energy">Energy Level</Label>
            <Slider
              id="energy"
              min={1}
              max={10}
              step={1}
              defaultValue={[5]}
              onValueChange={(value) => setValue('energy', value[0])}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Low Energy 🙃</span>
              <span>High Energy 😏</span>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full text-slate-900 font-semibold" disabled={loading}>
          {loading ? 'Analyzing...' : 'Get Personalized Activities'}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {activities && !error && (
        <div className="mt-8 space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl text-gray-700 font-semibold mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-2">{activity.description}</p>
              <p className="text-sm text-gray-500">Duration: {activity.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}