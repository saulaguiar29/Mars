# MARS 2.0 - Mobile Analysis & Reporting System

A professional React Native application designed for law enforcement officers to conduct, document, and manage field drug tests with integrated photo capture and data synchronization capabilities.

## Description

MARS 2.0 (Mobile Analysis & Reporting System) is a comprehensive mobile application built for law enforcement professionals to streamline the field drug testing process. The application provides a complete workflow from subject identification through test administration, photo documentation, result analysis, and secure data storage. All test data is stored locally on the device with synchronization capabilities for secure transmission to central databases when network connectivity is available.

The application guides officers through a structured six-step testing process: capturing subject details, recording test information, photographing the subject and their identification, scanning the test strip, analyzing results with confidence levels, and confirming successful data storage. This systematic approach ensures comprehensive documentation while maintaining chain of custody requirements.

---

## Wireframes

![mars1](./marsmockup1.jpg)
![mars2](./marsmockup2.jpg)

## iOS Human Interface Guidelines Implementation

### Navigation and Clarity

MARS 2.0 implements Apple's Human Interface Guidelines with careful attention to clarity, depth, and intuitive navigation patterns. The application utilizes iOS-standard navigation paradigms with a tab bar for primary sections and stack navigation for the linear test workflow. Following Apple's guidance on "Navigation" from the HIG, the app maintains a clear information hierarchy where users always understand their current location and can easily navigate backward through the back button present on all stack screens. The tab bar provides persistent access to Home and Settings, using SF Symbols-style icons that are immediately recognizable to iOS users. During the multi-step test process, each screen's title clearly indicates the current step, and the navigation bar includes both a back button and a descriptive header, ensuring users never feel lost in the workflow.

The application's cancel functionality follows Apple's recommendations for "Asking for Permission" and preventing data loss. Rather than silently discarding work, MARS 2.0 presents iOS-standard alert dialogs whenever a user attempts to cancel mid-workflow, using the destructive action style (red text) for the confirmation button as specified in the HIG. This pattern respects users' time and effort while protecting against accidental data loss. The confirmation screen at the end of the workflow uses header management appropriately, removing the back button to prevent users from accidentally returning to the results screen after data has been saved, which aligns with Apple's guidance on modal presentations and final confirmation states.

### Visual Design and Interaction

The visual design strictly adheres to Apple's guidelines for "Layout," "Color and Contrast," and "Typography." All interactive elements meet or exceed the minimum 44x44 point touch target size specified in the HIG, ensuring comfortable interaction even in field conditions where officers may be wearing gloves or working in challenging environments. The application uses generous 16-point margins and consistent spacing throughout, following iOS conventions for white space and visual breathing room. The color scheme centers on a professional navy blue (#1a237e) that conveys authority while maintaining sufficient contrast ratios (WCAG AA compliant) for text and interface elements, as required by Apple's accessibility guidelines.

Button hierarchy follows iOS patterns precisely: primary actions use filled buttons with the brand navy color, secondary actions use outlined buttons, and destructive actions (like Cancel) are styled in red (#f44336) to clearly communicate their nature. Disabled states reduce opacity to 0.4, providing clear visual feedback about interactive state. The form inputs throughout the application implement iOS-standard text field styling with proper keyboard handling—the keyboard type automatically matches the input requirements (e.g., capitalizing case numbers), and required fields are marked with red asterisks following platform conventions. The date picker uses the native iOS date wheel interface rather than a custom implementation, maintaining consistency with user expectations and system behavior. Camera permissions are requested at the point of use with clear explanation text in the Info.plist, following Apple's "Requesting Permission" guidelines to help users understand why access is needed. Status indicators use color-coding (green for synced, orange for pending) but pair colors with icons and text labels to ensure information is accessible to color-blind users, demonstrating adherence to inclusive design principles outlined in Apple's accessibility documentation.
