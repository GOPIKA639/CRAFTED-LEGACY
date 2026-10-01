# 🔍 Hero Section Update - Debugging Guide

## **STEP-BY-STEP TEST**

### **Step 1: Open Browser Console**
```
1. Go to http://localhost:3000 (homepage)
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. You should see logs starting with "🏠 [HomeSection]"
5. These confirm the component is mounted and listening
```

### **Step 2: Make an Admin Change**
```
1. Open NEW TAB: http://localhost:3000/#admin-dashboard
2. Click "Home" tab in admin
3. Find "Main Heading" field
4. Clear the current text
5. Type a TEST heading: "TEST HEADING 123"
6. Click "Save" button
```

### **Step 3: Check ADMIN Save Logs**
In the Admin Tab console, look for:
```
💾 [ADMIN SAVE] Initiating save...
💾 [SAVE] Starting save process...
💾 [SAVE] Content keys: ['home','commitments','collections',...]
💾 [SAVE] Customization: {...}
✅ [SAVE] localStorage write successful
📢 [SAVE] Dispatching admin-content-updated event...
✅ [SAVE] Event dispatched
🌐 [SAVE] Attempting to sync to server...
✅ [SAVE] Server sync successful
```

**If these don't appear:**
- Admin save is failing
- Check if there are error messages
- Try refreshing the admin page

### **Step 4: Check HOMEPAGE Logs**
Switch to the HOMEPAGE tab console and look for:
```
🏠 [HomeSection] Admin content updated event received
🏠 [HomeSection] Full site content: {...}
🏠 [HomeSection] Home content: {heading: "TEST HEADING 123", ...}
🏠 [HomeSection] Updated heading: TEST HEADING 123
🏠 [HomeSection] Updated buttonText: [button text]
🏠 [HomeSection] Updated subheading: [subheading]
🏠 [HomeSection] State updated, component will re-render
🏠 [HomeSection] Content state changed: {heading: "TEST HEADING 123", ...}
```

**If these DON'T appear:**
- Event is not being dispatched
- Component is not listening properly
- Go to Step 5

### **Step 5: Manual Refresh**
```
1. Stay on homepage
2. Press F5 or Ctrl+R to refresh
3. Check console for:
   🏠 [HomeSection] Component mounted, initial content: {...}
   🏠 [HomeSection] Heading: TEST HEADING 123
4. Look at the page - does the heading show "TEST HEADING 123"?
```

If YES → Data is saved! Component just needs the event to trigger.  
If NO → Data wasn't saved to admin store.

### **Step 6: Check localStorage Directly**
In browser console, run:
```javascript
// Check what's in localStorage
const stored = localStorage.getItem('crafted_legacy_admin_content');
console.log(JSON.parse(stored).home);

// You should see:
{
  heading: "TEST HEADING 123",
  subheading: "...",
  buttonText: "...",
  backgroundImage: ""
}
```

If heading is NOT "TEST HEADING 123":
- Admin save didn't work
- Data wasn't stored
- Go back to admin and try saving again

### **Step 7: Check Button Text**
```
1. Admin tab → Home section
2. Find "Button Text" field
3. Change to: "BUTTON TEST 456"
4. Click Save
5. Homepage console should show:
   🏠 [HomeSection] Updated buttonText: BUTTON TEST 456
6. Look at page - button text changed? YES/NO
```

---

## **TROUBLESHOOTING**

### **Problem: Console logs don't appear after saving admin**

**Solution:**
1. Check admin console for error logs
2. Look for: `❌ [SAVE] localStorage write failed`
3. If error appears, there's a save issue
4. Try refreshing admin page and saving again

### **Problem: Event logs appear but page doesn't update**

**Solution:**
1. This means event is working but component isn't re-rendering
2. Check if there are any React errors in console
3. Try refreshing the homepage (F5)
4. If refresh shows the change, then event listener is broken

### **Problem: Nothing changes even after refresh**

**Solution:**
1. Data wasn't saved to localStorage
2. In console, run: `localStorage.getItem('crafted_legacy_admin_content')`
3. Check if your changes are there
4. If not there, admin save is broken
5. Check admin save logs for errors

### **Problem: Admin says "✓ Saved!" but console shows error**

**Solution:**
1. Check for: `⚠️ [SAVE] Server returned status 500`
2. This means localStorage saved but server failed
3. This is OK - data is still saved locally
4. Event should still dispatch
5. Check if event logs appear

---

## **What Should Happen (Working State)**

### Timeline:
```
Admin Edit Field
    ↓
Click Save
    ↓
Console: 💾 [ADMIN SAVE] logs appear
Console: ✅ [SAVE] logs appear
    ↓
Homepage console: 🏠 [HomeSection] logs appear
    ↓
Page TEXT updates (heading/button)
    ↓
Font/colors/styling STAY THE SAME
    ↓
localStorage contains your changes
```

### Expected Console Output:
```
# When admin saves:
💾 [ADMIN SAVE] Initiating save...
💾 [SAVE] Starting save process...
✅ [SAVE] localStorage write successful

# When homepage receives update:
🏠 [HomeSection] Admin content updated event received
🏠 [HomeSection] Updated heading: [your text]
🏠 [HomeSection] Content state changed: {...}
```

---

## **Manual Test Command (Browser Console)**

If nothing is working, try this manual test:

```javascript
// 1. Manually dispatch event
console.log('Testing manual event dispatch...');
window.dispatchEvent(new CustomEvent('admin-content-updated'));

// 2. You should see in console:
// 🏠 [HomeSection] Admin content updated event received
// 🏠 [HomeSection] Updated heading: [current heading]

// 3. If you see these logs, event system works
// If not, component listener is broken
```

---

## **Quick Verification**

Run these checks in order:

1. ☐ Admin console shows save logs (💾 and ✅)
2. ☐ Homepage console shows event logs (🏠 Event received)
3. ☐ Homepage console shows content update logs (🏠 Updated heading)
4. ☐ localStorage has the new data
5. ☐ Page text actually changed
6. ☐ Font/color/styling stayed the same

**If all 6 are YES:** Everything is working! ✅

**If any are NO:** Report which one failed and we'll debug that specific issue.

---

## **Report Format**

Please tell me:
1. Did admin save logs appear? (YES/NO - what did you see?)
2. Did homepage event logs appear? (YES/NO - what did you see?)
3. Did page text change? (YES/NO - what should it have been?)
4. Did localStorage have the change? (YES/NO)
5. What exact text did you try to change it to?
6. What did you see on the page instead?

This will help me pinpoint the exact issue!

---

**Let me know what you see in the console and what happened on the page, and I'll fix it!**
