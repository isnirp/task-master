import { Header } from '@/components/layout/header'
import { Settings, User, Bell, Palette, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Settings" subtitle="Manage your preferences" />

      <div className="flex-1 p-6 max-w-2xl space-y-6">
        {/* Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-semibold text-slate-800">Profile</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-slate-500 mb-1">First Name</Label>
                <Input defaultValue="Prince" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-slate-500 mb-1">Last Name</Label>
                <Input defaultValue="Manager" className="mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-slate-500 mb-1">Email</Label>
              <Input defaultValue="prince@taskmaster.dev" className="mt-1" />
            </div>
            <Button size="sm">Save Profile</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-semibold text-slate-800">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Due date reminders', desc: '24 hours before task due', enabled: true },
              { label: 'Daily digest', desc: 'Morning summary of pending tasks', enabled: true },
              { label: 'Streak alerts', desc: 'Get reminded to keep your streak', enabled: false },
              { label: 'Weekly report', desc: 'Sunday productivity report', enabled: false },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    item.enabled ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-purple-500" />
            <h2 className="text-sm font-semibold text-slate-800">Appearance</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['Light', 'Dark', 'System'].map(theme => (
              <button
                key={theme}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                  theme === 'Light'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Data */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-green-500" />
            <h2 className="text-sm font-semibold text-slate-800">Data & Privacy</h2>
          </div>
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">Export all tasks as CSV</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Export all tasks as JSON</Button>
            <Separator />
            <Button variant="destructive" size="sm" className="w-full justify-start">Clear all completed tasks</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
