
import React, { useState } from 'react';
import { useAuth, RolePermissions, Permission } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Shield, User, Book, GraduationCap, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const PermissionManager = () => {
  const { permissions, updatePermissions } = useAuth();
  const [localPermissions, setLocalPermissions] = useState<RolePermissions>({...permissions});
  const [hasChanges, setHasChanges] = useState(false);

  const handleTogglePermission = (
    role: 'admin' | 'teacher' | 'student',
    permissionType: 'dashboard' | 'features',
    permissionId: string
  ) => {
    const updatedPermissions = { ...localPermissions };
    
    if (permissionType === 'dashboard') {
      updatedPermissions[role].dashboard.enabled = !updatedPermissions[role].dashboard.enabled;
      
      // If disabling dashboard, disable all features as well
      if (!updatedPermissions[role].dashboard.enabled) {
        Object.keys(updatedPermissions[role].features).forEach(featureKey => {
          updatedPermissions[role].features[featureKey].enabled = false;
        });
      }
    } else {
      // Find the feature and toggle it
      Object.keys(updatedPermissions[role].features).forEach(featureKey => {
        if (updatedPermissions[role].features[featureKey].id === permissionId) {
          updatedPermissions[role].features[featureKey].enabled = !updatedPermissions[role].features[featureKey].enabled;
        }
      });
    }
    
    setLocalPermissions(updatedPermissions);
    setHasChanges(true);
  };

  const saveChanges = () => {
    updatePermissions(localPermissions);
    setHasChanges(false);
    toast.success('Permissions updated successfully');
  };

  const resetChanges = () => {
    setLocalPermissions({...permissions});
    setHasChanges(false);
    toast.info('Changes discarded');
  };

  const renderPermissionItem = (
    permission: Permission, 
    role: 'admin' | 'teacher' | 'student', 
    permissionType: 'dashboard' | 'features'
  ) => {
    const isDisabled = permissionType === 'features' && !localPermissions[role].dashboard.enabled;
    
    return (
      <div 
        key={permission.id} 
        className={`p-4 rounded-lg border flex justify-between items-center ${isDisabled ? 'opacity-50' : ''}`}
      >
        <div>
          <h3 className="font-medium flex items-center">
            {permission.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {permission.description}
          </p>
        </div>
        <Switch 
          checked={permission.enabled} 
          disabled={isDisabled}
          onCheckedChange={() => handleTogglePermission(role, permissionType, permission.id)}
        />
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Permission Manager</h1>
            <p className="text-muted-foreground mt-1">
              Control access to features for each user role
            </p>
          </div>
          <div className="flex items-center gap-4">
            {hasChanges && (
              <>
                <Button variant="outline" onClick={resetChanges}>
                  Discard Changes
                </Button>
                <Button onClick={saveChanges}>
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </header>
        
        <Tabs defaultValue="admin">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admin" className="flex items-center justify-center gap-2">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center justify-center gap-2">
              <Book className="h-4 w-4" />
              <span>Teacher</span>
            </TabsTrigger>
            <TabsTrigger value="student" className="flex items-center justify-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Student</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Admin Role Permissions
                </CardTitle>
                <CardDescription>
                  Control access to admin features and dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Dashboard Access</h3>
                  {renderPermissionItem(localPermissions.admin.dashboard, 'admin', 'dashboard')}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Feature Access</h3>
                  <div className="space-y-4">
                    {Object.values(localPermissions.admin.features).map(permission => 
                      renderPermissionItem(permission, 'admin', 'features')
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teacher" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Teacher Role Permissions
                </CardTitle>
                <CardDescription>
                  Control access to teacher features and dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Dashboard Access</h3>
                  {renderPermissionItem(localPermissions.teacher.dashboard, 'teacher', 'dashboard')}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Feature Access</h3>
                  <div className="space-y-4">
                    {Object.values(localPermissions.teacher.features).map(permission => 
                      renderPermissionItem(permission, 'teacher', 'features')
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="student" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Student Role Permissions
                </CardTitle>
                <CardDescription>
                  Control access to student features and dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Dashboard Access</h3>
                  {renderPermissionItem(localPermissions.student.dashboard, 'student', 'dashboard')}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Feature Access</h3>
                  <div className="space-y-4">
                    {Object.values(localPermissions.student.features).map(permission => 
                      renderPermissionItem(permission, 'student', 'features')
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Permission Overview</CardTitle>
            <CardDescription>Summarized view of all role permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium flex items-center mb-3">
                  <User className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </h3>
                <Badge className={localPermissions.admin.dashboard.enabled ? 'bg-green-500' : 'bg-red-500'}>
                  {localPermissions.admin.dashboard.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <div className="space-y-2">
                    {Object.values(localPermissions.admin.features).map(feature => (
                      <div key={feature.id} className="flex justify-between items-center">
                        <span className="text-sm">{feature.name}</span>
                        {feature.enabled && localPermissions.admin.dashboard.enabled ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-sm text-muted-foreground">Off</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium flex items-center mb-3">
                  <Book className="h-4 w-4 mr-2" />
                  Teacher Dashboard
                </h3>
                <Badge className={localPermissions.teacher.dashboard.enabled ? 'bg-green-500' : 'bg-red-500'}>
                  {localPermissions.teacher.dashboard.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <div className="space-y-2">
                    {Object.values(localPermissions.teacher.features).map(feature => (
                      <div key={feature.id} className="flex justify-between items-center">
                        <span className="text-sm">{feature.name}</span>
                        {feature.enabled && localPermissions.teacher.dashboard.enabled ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-sm text-muted-foreground">Off</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium flex items-center mb-3">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Student Dashboard
                </h3>
                <Badge className={localPermissions.student.dashboard.enabled ? 'bg-green-500' : 'bg-red-500'}>
                  {localPermissions.student.dashboard.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <div className="space-y-2">
                    {Object.values(localPermissions.student.features).map(feature => (
                      <div key={feature.id} className="flex justify-between items-center">
                        <span className="text-sm">{feature.name}</span>
                        {feature.enabled && localPermissions.student.dashboard.enabled ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-sm text-muted-foreground">Off</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PermissionManager;
